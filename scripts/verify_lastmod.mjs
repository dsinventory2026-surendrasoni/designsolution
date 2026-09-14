import http from "http";
import { spawn } from "child_process";

const server = spawn("npx", ["next", "start", "-p", "3009"], { shell: true });
let started = false;

server.stdout.on("data", async (data) => {
  const str = data.toString();
  if (str.includes("Ready in") || str.includes("started server on") || str.includes("3009")) {
    if (!started) {
      started = true;
      setTimeout(async () => {
        try {
          const fetchUrl = (url) => {
            return new Promise((res) => {
              http.get(url, (resp) => {
                let body = "";
                resp.on("data", (c) => (body += c));
                resp.on("end", () => res({ status: resp.statusCode, body }));
              });
            });
          };

          const sm = await fetchUrl("http://localhost:3009/sitemap.xml");
          const urlBlocks = sm.body.match(/<url>([\s\S]*?)<\/url>/g) || [];

          console.log("\n==================================================");
          console.log("COMPLETE SITEMAP URL & LASTMOD REPORT");
          console.log("==================================================");
          console.log(`TOTAL URLS IN SITEMAP: ${urlBlocks.length}`);

          let blogCount = 0;
          let staticCount = 0;
          let propertyCount = 0;
          let has2018 = false;

          urlBlocks.forEach((block, idx) => {
            const loc = (block.match(/<loc>(.*?)<\/loc>/) || [])[1] || "";
            const lastmod = (block.match(/<lastmod>(.*?)<\/lastmod>/) || [])[1] || "";
            const changefreq = (block.match(/<changefreq>(.*?)<\/changefreq>/) || [])[1] || "";
            const priority = (block.match(/<priority>(.*?)<\/priority>/) || [])[1] || "";

            if (loc.includes("/blog/")) blogCount++;
            else if (loc.includes("/valuable-properties/")) propertyCount++;
            else staticCount++;

            if (lastmod.startsWith("2018")) {
              has2018 = true;
            }

            console.log(`${idx + 1}. [${loc}]`);
            console.log(`   lastmod: ${lastmod} | freq: ${changefreq} | priority: ${priority}`);
          });

          console.log("--------------------------------------------------");
          console.log(`SUMMARY: Static Pages: ${staticCount}, Property URLs: ${propertyCount}, Blog URLs: ${blogCount}`);
          console.log(`ANY 2018 TIMESTAMPS REMAINING: ${has2018 ? "YES (FAIL)" : "NO (CLEAN SUCCESS)"}`);
          console.log("==================================================\n");
        } catch (err) {
          console.error("Verification error:", err);
        } finally {
          server.kill();
          process.exit(0);
        }
      }, 2000);
    }
  }
});

server.stderr.on("data", (d) => {
  const s = d.toString();
  if (!s.includes("ExperimentalWarning")) {
    console.error(s);
  }
});

setTimeout(() => {
  server.kill();
  process.exit(0);
}, 25000);
