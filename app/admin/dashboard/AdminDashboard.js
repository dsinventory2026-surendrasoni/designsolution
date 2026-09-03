"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard, Home, Building2, Users, Star, Share2,
  FileText, Settings, LogOut, Plus, Pencil, Trash2, Save,
  X, ChevronDown, ChevronUp, CheckCircle2, AlertCircle,
  RefreshCw, Eye, Building, MapPin, PhoneCall, Mail, MessageSquare,
  Image as ImageIcon, ArrowLeft, ArrowRight, Menu, Sparkles, Copy, ExternalLink, BookOpen
} from "lucide-react";

// ─── Reusable UI Atoms ─────────────────────────────────────────────────────

function Toast({ msg, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className={`fixed top-5 right-5 z-[9999] flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl text-sm font-semibold transition-all duration-300 ${type === "success"
        ? "bg-emerald-600 text-white border border-emerald-500"
        : "bg-red-600 text-white border border-red-500"
      }`}>
      {type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
      <span>{msg}</span>
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100"><X className="w-3.5 h-3.5" /></button>
    </div>
  );
}

function InputField({ label, value, onChange, type = "text", placeholder = "", required = false, rows }) {
  const cls = "w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-slate-500 outline-none transition-all focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400/60";
  const style = { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" };

  return (
    <div>
      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">{label}</label>
      {rows ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={rows} required={required} className={cls} style={style} />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} required={required} className={cls} style={style} />
      )}
    </div>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 rounded-xl text-sm text-white outline-none transition-all focus:ring-2 focus:ring-amber-400/40"
        style={{ background: "rgba(30,40,60,0.9)", border: "1px solid rgba(255,255,255,0.1)" }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

function SectionCard({ title, icon: Icon, children }) {
  return (
    <div className="rounded-2xl p-6 mb-6" style={{ background: "rgba(10,22,40,0.7)", border: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-800">
        <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
          <Icon className="w-4 h-4 text-amber-400" />
        </div>
        <h3 className="text-base font-bold text-white">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function SaveBtn({ loading, onClick, label = "Save Changes" }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white transition-all"
      style={{ background: loading ? "rgba(201,169,110,0.5)" : "linear-gradient(135deg, #C9A96E, #b8933a)", boxShadow: "0 4px 15px rgba(201,169,110,0.2)" }}
    >
      {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
      <span>{loading ? "Saving..." : label}</span>
    </button>
  );
}

function Badge({ text, color = "amber" }) {
  const colors = {
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    green: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    red: "bg-red-500/10 text-red-400 border-red-500/20",
  };
  return (
    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${colors[color]}`}>
      {text}
    </span>
  );
}

// ─── SIDEBAR NAVIGATION ─────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "leads", label: "📋 Enquiries & Leads", icon: PhoneCall },
  { id: "blogs", label: "📰 Blogs & Articles", icon: BookOpen },
  { id: "hero", label: "Hero Section", icon: Home },
  { id: "valuable-properties", label: "📌 Valuable Properties", icon: Sparkles },
  { id: "properties", label: "Properties", icon: Building2 },
  { id: "about", label: "About Section", icon: Users },
  { id: "services", label: "Services", icon: Settings },
  { id: "testimonials", label: "Testimonials", icon: Star },
  { id: "social", label: "Social Media", icon: Share2 },
  { id: "footer", label: "Footer / Contact", icon: FileText },
];

// ─── HERO SECTION PANEL ─────────────────────────────────────────────────────

function HeroPanel({ showToast }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/hero").then((r) => r.json()).then((d) => {
      if (d.success) setData(d.data);
      setLoading(false);
    });
  }, []);

  const save = async () => {
    setSaving(true);
    const res = await fetch("/api/admin/hero", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const d = await res.json();
    setSaving(false);
    showToast(d.success ? "Hero section saved!" : d.message, d.success ? "success" : "error");
  };

  const updateTrustBadge = (idx, val) => {
    const badges = [...data.trustBadges];
    badges[idx] = { label: val };
    setData({ ...data, trustBadges: badges });
  };

  const addBadge = () => setData({ ...data, trustBadges: [...(data.trustBadges || []), { label: "" }] });
  const removeBadge = (idx) => setData({ ...data, trustBadges: data.trustBadges.filter((_, i) => i !== idx) });

  if (loading) return <div className="text-slate-400 text-sm">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Hero Section</h2>
          <p className="text-sm text-slate-400 mt-1">Edit the main banner content visible on your homepage</p>
        </div>
        <SaveBtn loading={saving} onClick={save} />
      </div>

      <SectionCard title="Main Content" icon={Home}>
        <div className="grid grid-cols-1 gap-4">
          <InputField label="Eyebrow Badge Text" value={data.eyebrowBadge || ""} onChange={(v) => setData({ ...data, eyebrowBadge: v })} placeholder="DS GROUP OF COMPANIES" />
          <InputField label="Main Headline" value={data.headline || ""} onChange={(v) => setData({ ...data, headline: v })} placeholder="Crafting Iconic Spaces & Timeless Luxury" rows={2} />
          <InputField label="Sub-Headline" value={data.subheadline || ""} onChange={(v) => setData({ ...data, subheadline: v })} rows={3} placeholder="Enter sub-headline text..." />
          <InputField label="Background Video URL" value={data.videoUrl || ""} onChange={(v) => setData({ ...data, videoUrl: v })} placeholder="/videos/hero-bg.mp4" />
        </div>
      </SectionCard>

      <SectionCard title="Call-to-Action Buttons" icon={ArrowRight}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Primary Button Text" value={data.primaryBtnText || ""} onChange={(v) => setData({ ...data, primaryBtnText: v })} />
          <InputField label="Primary Button Link" value={data.primaryBtnLink || ""} onChange={(v) => setData({ ...data, primaryBtnLink: v })} />
          <InputField label="Secondary Button Text" value={data.secondaryBtnText || ""} onChange={(v) => setData({ ...data, secondaryBtnText: v })} />
        </div>
      </SectionCard>

      <SectionCard title="Trust Badges (Bottom Bar)" icon={CheckCircle2}>
        <div className="space-y-3">
          {(data.trustBadges || []).map((badge, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <InputField label={`Badge ${idx + 1}`} value={badge.label} onChange={(v) => updateTrustBadge(idx, v)} placeholder="18+ Years Excellence" />
              <button onClick={() => removeBadge(idx)} className="mt-6 p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors shrink-0">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button onClick={addBadge} className="flex items-center gap-2 text-xs text-amber-400 hover:text-amber-300 font-semibold py-2">
            <Plus className="w-4 h-4" /> Add Badge
          </button>
        </div>
      </SectionCard>
    </div>
  );
}

// ─── PROPERTIES PANEL ───────────────────────────────────────────────────────

const PROPERTY_CATEGORIES = ["Residential", "Commercial", "Plots", "Construction", "New Launches"];
const PROPERTY_STATUSES = ["Available", "Under Construction", "Sold Out", "New Launch", "Ready to Move"];
const ICON_OPTIONS = ["Building2", "Palette", "Layers", "HardHat", "Home", "Briefcase", "MapPin", "Compass", "ShieldCheck"];

const EMPTY_PROPERTY = {
  id: "", title: "", category: "Residential", type: "Flat", location: "Sector 85, Gurugram",
  size: "", numericSize: 0, price: "", numericPrice: 0, status: "Available",
  featured: false, newLaunch: false, possessionDate: "", images: [""],
  shortDescription: "", description: "", amenities: [""], specifications: [{ label: "", value: "" }],
};

function PropertiesPanel({ showToast }) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProp, setEditingProp] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCat, setFilterCat] = useState("All");

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/properties");
    const d = await res.json();
    if (d.success) setProperties(d.data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchProperties(); }, [fetchProperties]);

  const filtered = properties.filter((p) => {
    const matchCat = filterCat === "All" || p.category === filterCat;
    const matchSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.location?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleSave = async () => {
    setSaving(true);
    const isNew = isAdding;
    const method = isNew ? "POST" : "PUT";
    const url = isNew ? "/api/admin/properties" : `/api/admin/properties?id=${editingProp.id}`;

    // Clean up empty amenities/images/specs
    const payload = {
      ...editingProp,
      amenities: (editingProp.amenities || []).filter((a) => a.trim()),
      images: (editingProp.images || []).filter((img) => img.trim()),
      specifications: (editingProp.specifications || []).filter((s) => s.label.trim()),
    };

    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const d = await res.json();
    setSaving(false);

    if (d.success) {
      showToast(isNew ? "Property added!" : "Property updated!", "success");
      setEditingProp(null);
      setIsAdding(false);
      fetchProperties();
    } else {
      showToast(d.message, "error");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this property?")) return;
    const res = await fetch(`/api/admin/properties?id=${id}`, { method: "DELETE" });
    const d = await res.json();
    showToast(d.success ? "Property deleted!" : d.message, d.success ? "success" : "error");
    if (d.success) fetchProperties();
  };

  const startEdit = (prop) => { setEditingProp({ ...prop, amenities: prop.amenities || [], images: prop.images || [""], specifications: prop.specifications || [] }); setIsAdding(false); };
  const startAdd = () => { setEditingProp({ ...EMPTY_PROPERTY, id: `ds-pro-${Date.now()}` }); setIsAdding(true); };

  // ── Edit Form ──
  if (editingProp) {
    return (
      <div>
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => { setEditingProp(null); setIsAdding(false); }} className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white">{isAdding ? "Add New Property" : "Edit Property"}</h2>
            <p className="text-xs text-slate-400">{editingProp.title || "New Property"}</p>
          </div>
          <SaveBtn loading={saving} onClick={handleSave} label={isAdding ? "Create Property" : "Save Changes"} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Basic Info */}
          <SectionCard title="Basic Information" icon={Building2}>
            <div className="space-y-4">
              <InputField label="Property ID" value={editingProp.id} onChange={(v) => setEditingProp({ ...editingProp, id: v })} placeholder="ds-res-101" />
              <InputField label="Title" value={editingProp.title} onChange={(v) => setEditingProp({ ...editingProp, title: v })} placeholder="DS Crown - Luxury 3 BHK" />
              <SelectField label="Category" value={editingProp.category} onChange={(v) => setEditingProp({ ...editingProp, category: v })} options={PROPERTY_CATEGORIES.map((c) => ({ label: c, value: c }))} />
              <InputField label="Type (Flat / Plot / Commercial Space etc.)" value={editingProp.type} onChange={(v) => setEditingProp({ ...editingProp, type: v })} />
              <SelectField label="Status" value={editingProp.status} onChange={(v) => setEditingProp({ ...editingProp, status: v })} options={PROPERTY_STATUSES.map((s) => ({ label: s, value: s }))} />
              <InputField label="Location" value={editingProp.location} onChange={(v) => setEditingProp({ ...editingProp, location: v })} />
              <InputField label="Possession Date" value={editingProp.possessionDate} onChange={(v) => setEditingProp({ ...editingProp, possessionDate: v })} placeholder="Ready to Move / December 2026" />
            </div>
          </SectionCard>

          {/* Price & Size */}
          <SectionCard title="Price & Size" icon={MapPin}>
            <div className="space-y-4">
              <InputField label="Size (display text)" value={editingProp.size} onChange={(v) => setEditingProp({ ...editingProp, size: v })} placeholder="1200 sq. ft." />
              <InputField label="Size (numeric, sq ft)" type="number" value={editingProp.numericSize} onChange={(v) => setEditingProp({ ...editingProp, numericSize: parseInt(v) || 0 })} />
              <InputField label="Price (display)" value={editingProp.price} onChange={(v) => setEditingProp({ ...editingProp, price: v })} placeholder="₹1.25 Cr" />
              <InputField label="Price (numeric, in Lakhs)" type="number" value={editingProp.numericPrice} onChange={(v) => setEditingProp({ ...editingProp, numericPrice: parseInt(v) || 0 })} />
              <div className="flex gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={editingProp.featured} onChange={(e) => setEditingProp({ ...editingProp, featured: e.target.checked })} className="w-4 h-4 rounded accent-amber-400" />
                  <span className="text-sm text-slate-300 font-medium">Featured Listing</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={editingProp.newLaunch} onChange={(e) => setEditingProp({ ...editingProp, newLaunch: e.target.checked })} className="w-4 h-4 rounded accent-amber-400" />
                  <span className="text-sm text-slate-300 font-medium">New Launch</span>
                </label>
              </div>
            </div>
          </SectionCard>

          {/* Descriptions */}
          <SectionCard title="Descriptions" icon={FileText}>
            <div className="space-y-4">
              <InputField label="Short Description" value={editingProp.shortDescription} onChange={(v) => setEditingProp({ ...editingProp, shortDescription: v })} rows={2} />
              <InputField label="Full Description" value={editingProp.description} onChange={(v) => setEditingProp({ ...editingProp, description: v })} rows={4} />
            </div>
          </SectionCard>

          {/* Images */}
          <SectionCard title="Images (URLs)" icon={ImageIcon}>
            <div className="space-y-3">
              {(editingProp.images || [""]).map((img, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <InputField label={`Image ${idx + 1} URL`} value={img} onChange={(v) => { const imgs = [...editingProp.images]; imgs[idx] = v; setEditingProp({ ...editingProp, images: imgs }); }} placeholder="https://..." />
                  <button onClick={() => { const imgs = editingProp.images.filter((_, i) => i !== idx); setEditingProp({ ...editingProp, images: imgs.length ? imgs : [""] }); }} className="mt-6 p-2 rounded-lg bg-red-500/10 text-red-400 shrink-0"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
              <button onClick={() => setEditingProp({ ...editingProp, images: [...(editingProp.images || []), ""] })} className="flex items-center gap-2 text-xs text-amber-400 font-semibold py-1">
                <Plus className="w-4 h-4" /> Add Image URL
              </button>
            </div>
          </SectionCard>

          {/* Amenities */}
          <SectionCard title="Amenities" icon={CheckCircle2}>
            <div className="space-y-2">
              {(editingProp.amenities || [""]).map((a, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input type="text" value={a} onChange={(e) => { const am = [...editingProp.amenities]; am[idx] = e.target.value; setEditingProp({ ...editingProp, amenities: am }); }}
                    placeholder="e.g. Swimming Pool" className="flex-1 px-4 py-2 rounded-xl text-sm text-white outline-none"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }} />
                  <button onClick={() => { const am = editingProp.amenities.filter((_, i) => i !== idx); setEditingProp({ ...editingProp, amenities: am.length ? am : [""] }); }} className="p-2 rounded-lg bg-red-500/10 text-red-400 shrink-0"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
              <button onClick={() => setEditingProp({ ...editingProp, amenities: [...(editingProp.amenities || []), ""] })} className="flex items-center gap-2 text-xs text-amber-400 font-semibold py-1">
                <Plus className="w-4 h-4" /> Add Amenity
              </button>
            </div>
          </SectionCard>

          {/* Specifications */}
          <SectionCard title="Specifications" icon={Settings}>
            <div className="space-y-3">
              {(editingProp.specifications || []).map((spec, idx) => (
                <div key={idx} className="grid grid-cols-2 gap-2">
                  <input type="text" value={spec.label} onChange={(e) => { const sp = [...editingProp.specifications]; sp[idx] = { ...sp[idx], label: e.target.value }; setEditingProp({ ...editingProp, specifications: sp }); }}
                    placeholder="Label (e.g. Flooring)" className="px-3 py-2 rounded-xl text-sm text-white outline-none"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }} />
                  <div className="flex gap-2">
                    <input type="text" value={spec.value} onChange={(e) => { const sp = [...editingProp.specifications]; sp[idx] = { ...sp[idx], value: e.target.value }; setEditingProp({ ...editingProp, specifications: sp }); }}
                      placeholder="Value (e.g. Italian Marble)" className="flex-1 px-3 py-2 rounded-xl text-sm text-white outline-none"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }} />
                    <button onClick={() => { const sp = editingProp.specifications.filter((_, i) => i !== idx); setEditingProp({ ...editingProp, specifications: sp }); }} className="p-2 rounded-lg bg-red-500/10 text-red-400 shrink-0"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
              <button onClick={() => setEditingProp({ ...editingProp, specifications: [...(editingProp.specifications || []), { label: "", value: "" }] })} className="flex items-center gap-2 text-xs text-amber-400 font-semibold py-1">
                <Plus className="w-4 h-4" /> Add Specification
              </button>
            </div>
          </SectionCard>
        </div>
      </div>
    );
  }

  // ── List View ──
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Properties</h2>
          <p className="text-sm text-slate-400 mt-1">{properties.length} listings in database</p>
        </div>
        <button onClick={startAdd} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white"
          style={{ background: "linear-gradient(135deg, #C9A96E, #b8933a)", boxShadow: "0 4px 15px rgba(201,169,110,0.2)" }}>
          <Plus className="w-4 h-4" /> Add New Property
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search properties..."
          className="px-4 py-2 rounded-xl text-sm text-white outline-none flex-1 min-w-48"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }} />
        <div className="flex gap-2 flex-wrap">
          {["All", ...PROPERTY_CATEGORIES].map((c) => (
            <button key={c} onClick={() => setFilterCat(c)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${filterCat === c ? "text-white" : "text-slate-400 hover:text-white"}`}
              style={{ background: filterCat === c ? "linear-gradient(135deg, #C9A96E, #b8933a)" : "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-slate-400 text-sm py-12 text-center"><RefreshCw className="w-6 h-6 animate-spin mx-auto mb-3 text-amber-400" />Loading properties...</div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filtered.map((prop) => (
            <div key={prop.id} className="flex items-center gap-4 p-4 rounded-2xl transition-all hover:border-amber-400/20"
              style={{ background: "rgba(10,22,40,0.7)", border: "1px solid rgba(255,255,255,0.07)" }}>
              {prop.images?.[0] && (
                <img src={prop.images[0]} alt={prop.title} className="w-20 h-16 rounded-xl object-cover shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2 flex-wrap">
                  <h4 className="text-sm font-bold text-white truncate">{prop.title}</h4>
                  {prop.featured && <Badge text="Featured" color="amber" />}
                  {prop.newLaunch && <Badge text="New" color="green" />}
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{prop.category} • {prop.location} • {prop.size} • {prop.price}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge text={prop.status} color={prop.status === "Available" ? "green" : prop.status === "Sold Out" ? "red" : "blue"} />
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => startEdit(prop)} className="p-2 rounded-lg text-blue-400 hover:bg-blue-500/10 transition-colors" title="Edit">
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(prop.id)} className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors" title="Delete">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-500">No properties found</div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── ABOUT PANEL ────────────────────────────────────────────────────────────

function AboutPanel({ showToast }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/about").then((r) => r.json()).then((d) => {
      if (d.success) setData(d.data);
      setLoading(false);
    });
  }, []);

  const save = async () => {
    setSaving(true);
    const res = await fetch("/api/admin/about", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    const d = await res.json();
    setSaving(false);
    showToast(d.success ? "About section saved!" : d.message, d.success ? "success" : "error");
  };

  const updateStat = (idx, field, val) => {
    const stats = [...data.owner.stats];
    stats[idx] = { ...stats[idx], [field]: val };
    setData({ ...data, owner: { ...data.owner, stats } });
  };

  if (loading || !data) return <div className="text-slate-400 text-sm">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">About Section</h2>
          <p className="text-sm text-slate-400 mt-1">Edit founder info and company details</p>
        </div>
        <SaveBtn loading={saving} onClick={save} />
      </div>

      <SectionCard title="Founder / Owner Details" icon={Users}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Owner Name" value={data.owner?.name || ""} onChange={(v) => setData({ ...data, owner: { ...data.owner, name: v } })} />
          <InputField label="Designation" value={data.owner?.designation || ""} onChange={(v) => setData({ ...data, owner: { ...data.owner, designation: v } })} />
          <InputField label="Photo URL" value={data.owner?.photo || ""} onChange={(v) => setData({ ...data, owner: { ...data.owner, photo: v } })} />
        </div>
        <div className="mt-4 space-y-4">
          <InputField label="Quote" value={data.owner?.quote || ""} onChange={(v) => setData({ ...data, owner: { ...data.owner, quote: v } })} rows={2} />
          <InputField label="Bio" value={data.owner?.bio || ""} onChange={(v) => setData({ ...data, owner: { ...data.owner, bio: v } })} rows={4} />
        </div>
      </SectionCard>

      <SectionCard title="Stats Counter" icon={Building}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(data.owner?.stats || []).map((stat, idx) => (
            <div key={idx} className="p-4 rounded-xl flex gap-3 items-end" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex-1 space-y-2">
                <InputField label="Label" value={stat.label} onChange={(v) => updateStat(idx, "label", v)} />
                <InputField label="Value" value={stat.value} onChange={(v) => updateStat(idx, "value", v)} />
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => setData({ ...data, owner: { ...data.owner, stats: [...(data.owner.stats || []), { label: "", value: "" }] } })}
          className="flex items-center gap-2 text-xs text-amber-400 font-semibold py-2 mt-2">
          <Plus className="w-4 h-4" /> Add Stat
        </button>
      </SectionCard>

      <SectionCard title="Brand Info" icon={Building2}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Company Name" value={data.brand?.name || ""} onChange={(v) => setData({ ...data, brand: { ...data.brand, name: v } })} />
          <InputField label="Short Name" value={data.brand?.shortName || ""} onChange={(v) => setData({ ...data, brand: { ...data.brand, shortName: v } })} />
          <InputField label="Tagline" value={data.brand?.tagline || ""} onChange={(v) => setData({ ...data, brand: { ...data.brand, tagline: v } })} />
          <InputField label="Established Year" type="number" value={data.brand?.establishedYear || 2008} onChange={(v) => setData({ ...data, brand: { ...data.brand, establishedYear: parseInt(v) } })} />
          <div className="md:col-span-2">
            <InputField label="Subtitle" value={data.brand?.subtitle || ""} onChange={(v) => setData({ ...data, brand: { ...data.brand, subtitle: v } })} rows={2} />
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

// ─── SERVICES PANEL ─────────────────────────────────────────────────────────

const EMPTY_SERVICE = { id: "", title: "", iconName: "Building2", badge: "", shortDescription: "", fullDescription: "" };

function ServicesPanel({ showToast }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingSvc, setEditingSvc] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchServices = useCallback(async () => {
    const res = await fetch("/api/admin/services");
    const d = await res.json();
    if (d.success) setServices(d.data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchServices(); }, [fetchServices]);

  const handleSave = async () => {
    setSaving(true);
    const method = isAdding ? "POST" : "PUT";
    const res = await fetch("/api/admin/services", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editingSvc) });
    const d = await res.json();
    setSaving(false);
    if (d.success) {
      showToast(isAdding ? "Service added!" : "Service updated!", "success");
      setEditingSvc(null); setIsAdding(false); fetchServices();
    } else { showToast(d.message, "error"); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this service?")) return;
    const res = await fetch(`/api/admin/services?id=${id}`, { method: "DELETE" });
    const d = await res.json();
    showToast(d.success ? "Service deleted!" : d.message, d.success ? "success" : "error");
    if (d.success) fetchServices();
  };

  if (editingSvc) {
    return (
      <div>
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => { setEditingSvc(null); setIsAdding(false); }} className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-bold text-white flex-1">{isAdding ? "Add Service" : "Edit Service"}</h2>
          <SaveBtn loading={saving} onClick={handleSave} label={isAdding ? "Add Service" : "Save"} />
        </div>
        <SectionCard title="Service Details" icon={Settings}>
          <div className="space-y-4">
            <InputField label="Service ID (unique, no spaces)" value={editingSvc.id} onChange={(v) => setEditingSvc({ ...editingSvc, id: v })} placeholder="interior-design" />
            <InputField label="Title" value={editingSvc.title} onChange={(v) => setEditingSvc({ ...editingSvc, title: v })} />
            <SelectField label="Icon" value={editingSvc.iconName} onChange={(v) => setEditingSvc({ ...editingSvc, iconName: v })} options={ICON_OPTIONS.map((o) => ({ label: o, value: o }))} />
            <InputField label="Badge Text" value={editingSvc.badge} onChange={(v) => setEditingSvc({ ...editingSvc, badge: v })} placeholder="Bespoke Luxury" />
            <InputField label="Short Description" value={editingSvc.shortDescription} onChange={(v) => setEditingSvc({ ...editingSvc, shortDescription: v })} rows={2} />
            <InputField label="Full Description" value={editingSvc.fullDescription} onChange={(v) => setEditingSvc({ ...editingSvc, fullDescription: v })} rows={4} />
          </div>
        </SectionCard>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h2 className="text-2xl font-bold text-white">Services</h2><p className="text-sm text-slate-400 mt-1">{services.length} services configured</p></div>
        <button onClick={() => { setEditingSvc({ ...EMPTY_SERVICE, id: `service-${Date.now()}` }); setIsAdding(true); }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white"
          style={{ background: "linear-gradient(135deg, #C9A96E, #b8933a)" }}>
          <Plus className="w-4 h-4" /> Add Service
        </button>
      </div>
      {loading ? <div className="text-slate-400 text-sm py-8 text-center"><RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-amber-400" />Loading...</div> : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((svc) => (
            <div key={svc.id} className="p-5 rounded-2xl" style={{ background: "rgba(10,22,40,0.7)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge text={svc.badge || svc.iconName} color="amber" />
                  </div>
                  <h4 className="text-sm font-bold text-white">{svc.title}</h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{svc.shortDescription}</p>
                </div>
                <div className="flex gap-1.5 shrink-0">
                  <button onClick={() => { setEditingSvc({ ...svc }); setIsAdding(false); }} className="p-1.5 rounded-lg text-blue-400 hover:bg-blue-500/10"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(svc.id)} className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── TESTIMONIALS PANEL ──────────────────────────────────────────────────────

const EMPTY_TESTIMONIAL = { name: "", role: "", image: "", rating: 5, propertyPurchased: "", text: "" };

function TestimonialsPanel({ showToast }) {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingT, setEditingT] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchT = useCallback(async () => {
    const res = await fetch("/api/admin/testimonials");
    const d = await res.json();
    if (d.success) setTestimonials(d.data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchT(); }, [fetchT]);

  const handleSave = async () => {
    setSaving(true);
    const method = isAdding ? "POST" : "PUT";
    const res = await fetch("/api/admin/testimonials", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editingT) });
    const d = await res.json();
    setSaving(false);
    if (d.success) { showToast(isAdding ? "Testimonial added!" : "Testimonial updated!", "success"); setEditingT(null); setIsAdding(false); fetchT(); }
    else showToast(d.message, "error");
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this testimonial?")) return;
    const res = await fetch(`/api/admin/testimonials?id=${id}`, { method: "DELETE" });
    const d = await res.json();
    showToast(d.success ? "Deleted!" : d.message, d.success ? "success" : "error");
    if (d.success) fetchT();
  };

  if (editingT) {
    return (
      <div>
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => { setEditingT(null); setIsAdding(false); }} className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"><ArrowLeft className="w-5 h-5" /></button>
          <h2 className="text-xl font-bold text-white flex-1">{isAdding ? "Add Testimonial" : "Edit Testimonial"}</h2>
          <SaveBtn loading={saving} onClick={handleSave} label={isAdding ? "Add" : "Save"} />
        </div>
        <SectionCard title="Testimonial Details" icon={Star}>
          <div className="space-y-4">
            <InputField label="Client Name" value={editingT.name} onChange={(v) => setEditingT({ ...editingT, name: v })} />
            <InputField label="Role / Title" value={editingT.role} onChange={(v) => setEditingT({ ...editingT, role: v })} placeholder="CEO, TechVentures India" />
            <InputField label="Photo URL" value={editingT.image} onChange={(v) => setEditingT({ ...editingT, image: v })} />
            <InputField label="Property Purchased" value={editingT.propertyPurchased} onChange={(v) => setEditingT({ ...editingT, propertyPurchased: v })} placeholder="3 BHK - DS Crown Heights" />
            <SelectField label="Rating" value={String(editingT.rating)} onChange={(v) => setEditingT({ ...editingT, rating: parseInt(v) })} options={[5, 4, 3, 2, 1].map((r) => ({ label: `${r} Stars`, value: String(r) }))} />
            <InputField label="Review Text" value={editingT.text} onChange={(v) => setEditingT({ ...editingT, text: v })} rows={4} />
          </div>
        </SectionCard>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h2 className="text-2xl font-bold text-white">Testimonials</h2><p className="text-sm text-slate-400 mt-1">{testimonials.length} reviews</p></div>
        <button onClick={() => { setEditingT({ ...EMPTY_TESTIMONIAL }); setIsAdding(true); }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white"
          style={{ background: "linear-gradient(135deg, #C9A96E, #b8933a)" }}>
          <Plus className="w-4 h-4" /> Add Review
        </button>
      </div>
      {loading ? <div className="text-slate-400 text-sm py-8 text-center"><RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-amber-400" />Loading...</div> : (
        <div className="grid grid-cols-1 gap-4">
          {testimonials.map((t) => (
            <div key={t.id} className="flex items-start gap-4 p-5 rounded-2xl" style={{ background: "rgba(10,22,40,0.7)", border: "1px solid rgba(255,255,255,0.07)" }}>
              {t.image && <img src={t.image} alt={t.name} className="w-14 h-14 rounded-xl object-cover shrink-0" />}
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-white">{t.name}</h4>
                    <p className="text-xs text-slate-400">{t.role}</p>
                    <p className="text-xs text-amber-400 mt-0.5">{"⭐".repeat(t.rating || 5)}</p>
                  </div>
                  <div className="flex gap-1.5 shrink-0">
                    <button onClick={() => { setEditingT({ ...t }); setIsAdding(false); }} className="p-1.5 rounded-lg text-blue-400 hover:bg-blue-500/10"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(t.id)} className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
                <p className="text-xs text-slate-300 mt-2 italic line-clamp-2">"{t.text}"</p>
                <p className="text-[10px] text-emerald-400 mt-1">✓ {t.propertyPurchased}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── SOCIAL MEDIA PANEL ──────────────────────────────────────────────────────

function SocialPanel({ showToast }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/social").then((r) => r.json()).then((d) => {
      if (d.success) setData(d.data);
      setLoading(false);
    });
  }, []);

  const save = async () => {
    setSaving(true);
    const res = await fetch("/api/admin/social", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    const d = await res.json();
    setSaving(false);
    showToast(d.success ? "Social links saved!" : d.message, d.success ? "success" : "error");
  };

  if (loading || !data) return <div className="text-slate-400 text-sm">Loading...</div>;

  const socialFields = [
    { key: "instagram", label: "Instagram URL", placeholder: "https://instagram.com/..." },
    { key: "facebook", label: "Facebook URL", placeholder: "https://facebook.com/..." },
    { key: "whatsapp", label: "WhatsApp URL", placeholder: "https://wa.me/91..." },
    { key: "twitter", label: "Twitter / X URL", placeholder: "https://x.com/..." },
    { key: "linkedin", label: "LinkedIn URL", placeholder: "https://linkedin.com/company/..." },
    { key: "youtube", label: "YouTube URL", placeholder: "https://youtube.com/@..." },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h2 className="text-2xl font-bold text-white">Social Media</h2><p className="text-sm text-slate-400 mt-1">All social media links used in website & floating widget</p></div>
        <SaveBtn loading={saving} onClick={save} />
      </div>
      <SectionCard title="Social Platform Links" icon={Share2}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {socialFields.map(({ key, label, placeholder }) => (
            <InputField key={key} label={label} value={data[key] || ""} onChange={(v) => setData({ ...data, [key]: v })} placeholder={placeholder} />
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

// ─── FOOTER PANEL ────────────────────────────────────────────────────────────

function FooterPanel({ showToast }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/footer").then((r) => r.json()).then((d) => {
      if (d.success) setData(d.data);
      setLoading(false);
    });
  }, []);

  const save = async () => {
    setSaving(true);
    const res = await fetch("/api/admin/footer", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    const d = await res.json();
    setSaving(false);
    showToast(d.success ? "Footer settings saved!" : d.message, d.success ? "success" : "error");
  };

  if (loading || !data) return <div className="text-slate-400 text-sm">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h2 className="text-2xl font-bold text-white">Footer / Contact</h2><p className="text-sm text-slate-400 mt-1">Edit contact details and footer content</p></div>
        <SaveBtn loading={saving} onClick={save} />
      </div>

      <SectionCard title="Contact Information" icon={PhoneCall}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Primary Phone" value={data.contact?.phonePrimary || ""} onChange={(v) => setData({ ...data, contact: { ...data.contact, phonePrimary: v } })} />
          <InputField label="Secondary Phone" value={data.contact?.phoneSecondary || ""} onChange={(v) => setData({ ...data, contact: { ...data.contact, phoneSecondary: v } })} />
          <InputField label="WhatsApp Number (digits only)" value={data.contact?.whatsappNumber || ""} onChange={(v) => setData({ ...data, contact: { ...data.contact, whatsappNumber: v, whatsappLink: `https://wa.me/91${v}` } })} />
          <InputField label="Primary Email" type="email" value={data.contact?.emailPrimary || ""} onChange={(v) => setData({ ...data, contact: { ...data.contact, emailPrimary: v } })} />
          <InputField label="Sales Email" type="email" value={data.contact?.emailSales || ""} onChange={(v) => setData({ ...data, contact: { ...data.contact, emailSales: v } })} />
          <InputField label="Working Hours" value={data.contact?.workingHours || ""} onChange={(v) => setData({ ...data, contact: { ...data.contact, workingHours: v } })} />
        </div>
      </SectionCard>

      <SectionCard title="Office Address" icon={MapPin}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Plot / Building" value={data.contact?.addressPlot || ""} onChange={(v) => setData({ ...data, contact: { ...data.contact, addressPlot: v } })} />
          <InputField label="Tower / Block" value={data.contact?.addressTower || ""} onChange={(v) => setData({ ...data, contact: { ...data.contact, addressTower: v } })} />
          <InputField label="Floor" value={data.contact?.addressFloor || ""} onChange={(v) => setData({ ...data, contact: { ...data.contact, addressFloor: v } })} />
          <InputField label="City" value={data.contact?.addressCity || ""} onChange={(v) => setData({ ...data, contact: { ...data.contact, addressCity: v } })} />
          <InputField label="State" value={data.contact?.addressState || ""} onChange={(v) => setData({ ...data, contact: { ...data.contact, addressState: v } })} />
          <InputField label="Pincode" value={data.contact?.addressPincode || ""} onChange={(v) => setData({ ...data, contact: { ...data.contact, addressPincode: v } })} />
          <div className="md:col-span-2">
            <InputField label="Google Maps Embed URL" value={data.contact?.googleMapEmbedUrl || ""} onChange={(v) => setData({ ...data, contact: { ...data.contact, googleMapEmbedUrl: v } })} placeholder="https://www.google.com/maps/embed?pb=..." />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Footer Brand Text" icon={Building}>
        <div className="space-y-4">
          <InputField label="Logo Text" value={data.brand?.logoText || ""} onChange={(v) => setData({ ...data, brand: { ...data.brand, logoText: v } })} />
          <InputField label="Logo Sub-text" value={data.brand?.logoSubtext || ""} onChange={(v) => setData({ ...data, brand: { ...data.brand, logoSubtext: v } })} />
          <InputField label="Footer Tagline" value={data.brand?.footerTagline || ""} onChange={(v) => setData({ ...data, brand: { ...data.brand, footerTagline: v } })} rows={2} />
        </div>
      </SectionCard>
    </div>
  );
}

// ─── VALUABLE PROPERTIES PANEL ──────────────────────────────────────────────

const EMPTY_VALUABLE_PROPERTY = {
  projectName: "",
  slug: "",
  thumbnail: "",
  heroBanner: "",
  gallery: [""],
  propertyType: "Apartment",
  location: "Gurugram, Haryana",
  price: "",
  offerPrice: "",
  area: "",
  bedrooms: "",
  bathrooms: "",
  parking: "",
  status: "Available",
  shortDescription: "",
  fullDescription: "",
  amenities: [""],
  features: [""],
  specifications: [{ label: "", value: "" }],
  googleMap: "",
  builderName: "",
  reraNumber: "",
  possessionDate: "",
  contactNumber: "",
  whatsappNumber: "",
  featured: false,
  popupEnabled: true,
  priority: 1,
  publishStatus: "Published",
  seoTitle: "",
  seoDescription: "",
  seoKeywords: "",
};

function ValuablePropertiesPanel({ showToast }) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProp, setEditingProp] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPublish, setFilterPublish] = useState("All");

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/valuable-properties");
    const d = await res.json();
    if (d.success) setProperties(d.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const filtered = properties.filter((p) => {
    const matchPublish = filterPublish === "All" || p.publishStatus === filterPublish;
    const matchSearch =
      p.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.builderName?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchPublish && matchSearch;
  });

  const handleSave = async () => {
    setSaving(true);
    const isNew = isAdding;
    const method = isNew ? "POST" : "PUT";
    const url = isNew ? "/api/admin/valuable-properties" : `/api/admin/valuable-properties?id=${editingProp._id}`;

    const payload = {
      ...editingProp,
      gallery: (editingProp.gallery || []).filter((img) => img.trim()),
      amenities: (editingProp.amenities || []).filter((a) => a.trim()),
      features: (editingProp.features || []).filter((f) => f.trim()),
      specifications: (editingProp.specifications || []).filter((s) => s.label.trim()),
    };

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const d = await res.json();
    setSaving(false);

    if (d.success) {
      showToast(isNew ? "Valuable Property created!" : "Valuable Property updated!", "success");
      setEditingProp(null);
      setIsAdding(false);
      fetchProperties();
    } else {
      showToast(d.message, "error");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this Valuable Property?")) return;
    const res = await fetch(`/api/admin/valuable-properties?id=${id}`, { method: "DELETE" });
    const d = await res.json();
    showToast(d.success ? "Valuable Property deleted!" : d.message, d.success ? "success" : "error");
    if (d.success) fetchProperties();
  };

  const handleDuplicate = (prop) => {
    const duplicated = {
      ...prop,
      _id: undefined,
      projectName: `${prop.projectName} (Copy)`,
      slug: `${prop.slug}-copy-${Date.now().toString().slice(-4)}`,
      publishStatus: "Unpublished",
    };
    setEditingProp(duplicated);
    setIsAdding(true);
    showToast("Duplicated as draft. Make edits and save.", "success");
  };

  const startEdit = (prop) => {
    setEditingProp({
      ...prop,
      gallery: prop.gallery?.length ? prop.gallery : [""],
      amenities: prop.amenities?.length ? prop.amenities : [""],
      features: prop.features?.length ? prop.features : [""],
      specifications: prop.specifications?.length ? prop.specifications : [{ label: "", value: "" }],
    });
    setIsAdding(false);
  };

  const startAdd = () => {
    setEditingProp({ ...EMPTY_VALUABLE_PROPERTY });
    setIsAdding(true);
  };

  // ── Edit Form ──
  if (editingProp) {
    return (
      <div>
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => { setEditingProp(null); setIsAdding(false); }} className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white">{isAdding ? "Create Valuable Property" : "Edit Valuable Property"}</h2>
            <p className="text-xs text-slate-400">{editingProp.projectName || "New Project"}</p>
          </div>
          {editingProp.slug && !isAdding && (
            <a href={`/valuable-properties/${editingProp.slug}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-amber-400 bg-amber-400/10 border border-amber-400/20 hover:bg-amber-400/20 transition-all">
              <ExternalLink className="w-3.5 h-3.5" /> Preview Page
            </a>
          )}
          <SaveBtn loading={saving} onClick={handleSave} label={isAdding ? "Create Property" : "Save Changes"} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Main Overview */}
          <SectionCard title="Basic Details" icon={Building2}>
            <div className="space-y-4">
              <InputField label="Project Name *" value={editingProp.projectName} onChange={(v) => setEditingProp({ ...editingProp, projectName: v, slug: editingProp.slug || v.toLowerCase().replace(/[^a-z0-9]+/g, "-") })} placeholder="e.g. DS Imperial Residences" required />
              <InputField label="Slug (URL identifier)" value={editingProp.slug} onChange={(v) => setEditingProp({ ...editingProp, slug: v })} placeholder="ds-imperial-residences" />
              <InputField label="Builder / Developer Name" value={editingProp.builderName} onChange={(v) => setEditingProp({ ...editingProp, builderName: v })} placeholder="DS Realty Group" />
              <InputField label="Property Type" value={editingProp.propertyType} onChange={(v) => setEditingProp({ ...editingProp, propertyType: v })} placeholder="Luxury Penthouse / Villa / Apartment" />
              <InputField label="Location" value={editingProp.location} onChange={(v) => setEditingProp({ ...editingProp, location: v })} placeholder="Golf Course Road, Gurugram" />
              <SelectField label="Availability Status" value={editingProp.status} onChange={(v) => setEditingProp({ ...editingProp, status: v })} options={["Available", "Under Construction", "Ready to Move", "Upcoming", "Sold Out"].map((s) => ({ label: s, value: s }))} />
              <InputField label="Possession Date" value={editingProp.possessionDate} onChange={(v) => setEditingProp({ ...editingProp, possessionDate: v })} placeholder="Ready to Move / Dec 2027" />
              <InputField label="RERA Number" value={editingProp.reraNumber} onChange={(v) => setEditingProp({ ...editingProp, reraNumber: v })} placeholder="RC/REP/HARERA/GGM/..." />
            </div>
          </SectionCard>

          {/* Pricing & Controls */}
          <SectionCard title="Pricing & Hero Popup Controls" icon={Sparkles}>
            <div className="space-y-4">
              <InputField label="Starting Price (Display Text)" value={editingProp.price} onChange={(v) => setEditingProp({ ...editingProp, price: v })} placeholder="₹3.5 Cr Onwards" />
              <InputField label="Offer / Special Price (Optional)" value={editingProp.offerPrice} onChange={(v) => setEditingProp({ ...editingProp, offerPrice: v })} placeholder="₹3.2 Cr (Festive Discount)" />
              <InputField label="Super / Carpet Area" value={editingProp.area} onChange={(v) => setEditingProp({ ...editingProp, area: v })} placeholder="2,800 - 4,500 Sq. Ft." />
              <div className="grid grid-cols-3 gap-3">
                <InputField label="Bedrooms" value={editingProp.bedrooms} onChange={(v) => setEditingProp({ ...editingProp, bedrooms: v })} placeholder="3, 4 BHK" />
                <InputField label="Bathrooms" value={editingProp.bathrooms} onChange={(v) => setEditingProp({ ...editingProp, bathrooms: v })} placeholder="4" />
                <InputField label="Parking" value={editingProp.parking} onChange={(v) => setEditingProp({ ...editingProp, parking: v })} placeholder="2 Reserved" />
              </div>
              <InputField label="Priority Order (Higher appears first in Popup)" type="number" value={editingProp.priority} onChange={(v) => setEditingProp({ ...editingProp, priority: parseInt(v) || 0 })} />
              <SelectField label="Publish Status" value={editingProp.publishStatus} onChange={(v) => setEditingProp({ ...editingProp, publishStatus: v })} options={[{ label: "Published (Visible)", value: "Published" }, { label: "Unpublished (Draft)", value: "Unpublished" }]} />
              
              <div className="flex gap-6 pt-3 border-t border-slate-800">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={editingProp.popupEnabled} onChange={(e) => setEditingProp({ ...editingProp, popupEnabled: e.target.checked })} className="w-4 h-4 rounded accent-amber-400" />
                  <span className="text-sm text-slate-200 font-semibold">Enable Hero Floating Popup</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={editingProp.featured} onChange={(e) => setEditingProp({ ...editingProp, featured: e.target.checked })} className="w-4 h-4 rounded accent-amber-400" />
                  <span className="text-sm text-slate-200 font-semibold">Featured Badge</span>
                </label>
              </div>
            </div>
          </SectionCard>

          {/* Descriptions & Contacts */}
          <SectionCard title="Descriptions & Contact Numbers" icon={PhoneCall}>
            <div className="space-y-4">
              <InputField label="Short Tagline / Summary (Shown in Popup)" value={editingProp.shortDescription} onChange={(v) => setEditingProp({ ...editingProp, shortDescription: v })} rows={2} placeholder="Ultra-luxury 4 BHK residences with private splash pools on Golf Course Road" />
              <InputField label="Full Overview Description" value={editingProp.fullDescription} onChange={(v) => setEditingProp({ ...editingProp, fullDescription: v })} rows={5} placeholder="Detailed property overview..." />
              <div className="grid grid-cols-2 gap-3">
                <InputField label="Direct Contact Phone" value={editingProp.contactNumber} onChange={(v) => setEditingProp({ ...editingProp, contactNumber: v })} placeholder="+91 98765 43210" />
                <InputField label="WhatsApp Number (Digits only)" value={editingProp.whatsappNumber} onChange={(v) => setEditingProp({ ...editingProp, whatsappNumber: v })} placeholder="919876543210" />
              </div>
              <InputField label="Google Map Embed URL" value={editingProp.googleMap} onChange={(v) => setEditingProp({ ...editingProp, googleMap: v })} placeholder="https://www.google.com/maps/embed?pb=..." />
            </div>
          </SectionCard>

          {/* Media Images */}
          <SectionCard title="Images & Banners" icon={ImageIcon}>
            <div className="space-y-4">
              <InputField label="Thumbnail Image URL (Used in Popup & Cards)" value={editingProp.thumbnail} onChange={(v) => setEditingProp({ ...editingProp, thumbnail: v })} placeholder="https://images.unsplash.com/..." />
              <InputField label="Hero Banner Image URL (Used in Details Page Header)" value={editingProp.heroBanner} onChange={(v) => setEditingProp({ ...editingProp, heroBanner: v })} placeholder="https://images.unsplash.com/..." />
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Gallery Image URLs</label>
                <div className="space-y-2">
                  {(editingProp.gallery || [""]).map((img, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input type="text" value={img} onChange={(e) => { const gal = [...editingProp.gallery]; gal[idx] = e.target.value; setEditingProp({ ...editingProp, gallery: gal }); }}
                        placeholder="https://..." className="flex-1 px-4 py-2 rounded-xl text-sm text-white outline-none"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }} />
                      <button onClick={() => { const gal = editingProp.gallery.filter((_, i) => i !== idx); setEditingProp({ ...editingProp, gallery: gal.length ? gal : [""] }); }} className="p-2 rounded-lg bg-red-500/10 text-red-400 shrink-0"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  ))}
                  <button onClick={() => setEditingProp({ ...editingProp, gallery: [...(editingProp.gallery || []), ""] })} className="flex items-center gap-2 text-xs text-amber-400 font-semibold py-1">
                    <Plus className="w-4 h-4" /> Add Gallery Image
                  </button>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Amenities & Features */}
          <SectionCard title="Amenities & Features" icon={CheckCircle2}>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Amenities</label>
                <div className="space-y-2">
                  {(editingProp.amenities || [""]).map((a, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input type="text" value={a} onChange={(e) => { const am = [...editingProp.amenities]; am[idx] = e.target.value; setEditingProp({ ...editingProp, amenities: am }); }}
                        placeholder="e.g. Temperature Controlled Pool" className="flex-1 px-4 py-2 rounded-xl text-sm text-white outline-none"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }} />
                      <button onClick={() => { const am = editingProp.amenities.filter((_, i) => i !== idx); setEditingProp({ ...editingProp, amenities: am.length ? am : [""] }); }} className="p-2 rounded-lg bg-red-500/10 text-red-400 shrink-0"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  ))}
                  <button onClick={() => setEditingProp({ ...editingProp, amenities: [...(editingProp.amenities || []), ""] })} className="flex items-center gap-2 text-xs text-amber-400 font-semibold py-1">
                    <Plus className="w-4 h-4" /> Add Amenity
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Key Highlights / Features</label>
                <div className="space-y-2">
                  {(editingProp.features || [""]).map((f, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input type="text" value={f} onChange={(e) => { const ft = [...editingProp.features]; ft[idx] = e.target.value; setEditingProp({ ...editingProp, features: ft }); }}
                        placeholder="e.g. 11ft Floor to Ceiling Height" className="flex-1 px-4 py-2 rounded-xl text-sm text-white outline-none"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }} />
                      <button onClick={() => { const ft = editingProp.features.filter((_, i) => i !== idx); setEditingProp({ ...editingProp, features: ft.length ? ft : [""] }); }} className="p-2 rounded-lg bg-red-500/10 text-red-400 shrink-0"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  ))}
                  <button onClick={() => setEditingProp({ ...editingProp, features: [...(editingProp.features || []), ""] })} className="flex items-center gap-2 text-xs text-amber-400 font-semibold py-1">
                    <Plus className="w-4 h-4" /> Add Highlight Feature
                  </button>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* SEO Metadata */}
          <SectionCard title="SEO Metadata" icon={FileText}>
            <div className="space-y-4">
              <InputField label="SEO Meta Title" value={editingProp.seoTitle} onChange={(v) => setEditingProp({ ...editingProp, seoTitle: v })} placeholder="DS Imperial Residences - Luxury 4 BHK Apartments Gurugram" />
              <InputField label="SEO Meta Description" value={editingProp.seoDescription} onChange={(v) => setEditingProp({ ...editingProp, seoDescription: v })} rows={3} placeholder="Explore ultra luxury 4 BHK apartments..." />
              <InputField label="SEO Keywords" value={editingProp.seoKeywords} onChange={(v) => setEditingProp({ ...editingProp, seoKeywords: v })} placeholder="luxury property gurugram, 4 BHK flat golf course road" />
            </div>
          </SectionCard>
        </div>
      </div>
    );
  }

  // ── List View ──
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-400" />
            <h2 className="text-2xl font-bold text-white">Valuable Properties</h2>
          </div>
          <p className="text-sm text-slate-400 mt-1">Independent module for Hero Section Featured Popups & High-Value Listings ({properties.length} items)</p>
        </div>
        <button onClick={startAdd} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white"
          style={{ background: "linear-gradient(135deg, #C9A96E, #b8933a)", boxShadow: "0 4px 15px rgba(201,169,110,0.2)" }}>
          <Plus className="w-4 h-4" /> Add Valuable Property
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search Valuable Properties..."
          className="px-4 py-2 rounded-xl text-sm text-white outline-none flex-1 min-w-48"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }} />
        <div className="flex gap-2">
          {["All", "Published", "Unpublished"].map((st) => (
            <button key={st} onClick={() => setFilterPublish(st)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${filterPublish === st ? "text-white" : "text-slate-400 hover:text-white"}`}
              style={{ background: filterPublish === st ? "linear-gradient(135deg, #C9A96E, #b8933a)" : "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              {st}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-slate-400 text-sm py-12 text-center"><RefreshCw className="w-6 h-6 animate-spin mx-auto mb-3 text-amber-400" />Loading Valuable Properties...</div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filtered.map((prop) => (
            <div key={prop._id} className="flex items-center gap-4 p-4 rounded-2xl transition-all hover:border-amber-400/30"
              style={{ background: "rgba(10,22,40,0.7)", border: "1px solid rgba(201,169,110,0.15)" }}>
              {prop.thumbnail || prop.heroBanner ? (
                <img src={prop.thumbnail || prop.heroBanner} alt={prop.projectName} className="w-24 h-18 rounded-xl object-cover shrink-0" />
              ) : (
                <div className="w-24 h-18 rounded-xl bg-slate-800 flex items-center justify-center text-slate-500 shrink-0"><Building2 className="w-6 h-6" /></div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2 flex-wrap">
                  <h4 className="text-sm font-bold text-white truncate">{prop.projectName}</h4>
                  {prop.publishStatus === "Published" ? <Badge text="Published" color="green" /> : <Badge text="Unpublished" color="red" />}
                  {prop.popupEnabled && <Badge text="Popup Active" color="amber" />}
                  <span className="text-[10px] text-slate-400 font-mono">Priority: {prop.priority}</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">{prop.propertyType} • {prop.location} • {prop.price || "Price on Request"}</p>
                {prop.shortDescription && <p className="text-xs text-slate-300 mt-1 line-clamp-1 italic">{prop.shortDescription}</p>}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a href={`/valuable-properties/${prop.slug}`} target="_blank" rel="noreferrer" className="p-2 rounded-lg text-amber-400 hover:bg-amber-500/10 transition-colors" title="Preview Page">
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button onClick={() => handleDuplicate(prop)} className="p-2 rounded-lg text-indigo-400 hover:bg-indigo-500/10 transition-colors" title="Duplicate">
                  <Copy className="w-4 h-4" />
                </button>
                <button onClick={() => startEdit(prop)} className="p-2 rounded-lg text-blue-400 hover:bg-blue-500/10 transition-colors" title="Edit">
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(prop._id)} className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors" title="Delete">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-500">No Valuable Properties found. Click "Add Valuable Property" to create one.</div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── OVERVIEW PANEL ──────────────────────────────────────────────────────────

function OverviewPanel({ showToast, adminEmail }) {
  const [seeding, setSeeding] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetch("/api/admin/seed").then((r) => r.json()).then((d) => { if (d.success) setStatus(d); });
  }, []);

  const handleSeed = async () => {
    setSeeding(true);
    const res = await fetch("/api/admin/seed", { method: "POST" });
    const d = await res.json();
    setSeeding(false);
    showToast(d.success ? "Data seeded successfully!" : d.message, d.success ? "success" : "error");
    if (d.success) setStatus({ siteConfigSeeded: true, propertiesSeeded: true });
  };

  const stats = [
    { label: "Admin Email", value: adminEmail, icon: Mail },
    { label: "Site Config", value: status?.siteConfigSeeded ? "✓ Seeded" : "Not seeded", icon: Settings },
    { label: "Properties", value: status?.propertiesSeeded ? "✓ Seeded" : "Not seeded", icon: Building2 },
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">Welcome to Admin Dashboard</h2>
        <p className="text-slate-400 text-sm mt-1">DS Group of Companies — Content Management Panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="p-5 rounded-2xl" style={{ background: "rgba(10,22,40,0.7)", border: "1px solid rgba(201,169,110,0.15)" }}>
            <div className="flex items-center gap-3 mb-2">
              <Icon className="w-5 h-5 text-amber-400" />
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</span>
            </div>
            <p className="text-sm font-semibold text-white">{value}</p>
          </div>
        ))}
      </div>

      <SectionCard title="Database Management" icon={RefreshCw}>
        <p className="text-sm text-slate-300 mb-4">
          If the website data is not yet in MongoDB, click below to seed it from the static data files.
          This is a one-time operation — it won't overwrite existing data.
        </p>
        <button onClick={handleSeed} disabled={seeding}
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white"
          style={{ background: seeding ? "rgba(201,169,110,0.5)" : "linear-gradient(135deg, #1e40af, #3b82f6)", boxShadow: "0 4px 15px rgba(30,64,175,0.3)" }}>
          {seeding ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
          {seeding ? "Seeding..." : "Seed Static Data to MongoDB"}
        </button>
      </SectionCard>

      <SectionCard title="Quick Navigation" icon={LayoutDashboard}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {NAV_ITEMS.filter((n) => n.id !== "overview").map(({ id, label, icon: Icon }) => (
            <div key={id} className="p-4 rounded-xl cursor-pointer hover:border-amber-400/30 transition-all"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <Icon className="w-5 h-5 text-amber-400 mb-2" />
              <p className="text-xs font-semibold text-white">{label}</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

// ─── LEADS & ENQUIRIES PANEL ───────────────────────────────────────────────

function LeadsPanel({ showToast }) {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/leads");
      const data = await res.json();
      if (data.success) {
        setLeads(data.data || []);
      } else {
        showToast(data.message || "Failed to load leads", "error");
      }
    } catch (err) {
      showToast("Error loading leads", "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) =>
          prev.map((l) => (l._id === id ? { ...l, status: newStatus } : l))
        );
        showToast("Lead status updated!", "success");
      } else {
        showToast(data.message || "Update failed", "error");
      }
    } catch (err) {
      showToast("Failed to update status", "error");
    }
  };

  const handleDeleteLead = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete lead for "${name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/leads?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) => prev.filter((l) => l._id !== id));
        showToast("Lead deleted successfully", "success");
      } else {
        showToast(data.message || "Deletion failed", "error");
      }
    } catch (err) {
      showToast("Failed to delete lead", "error");
    }
  };

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = statusFilter === "All" || lead.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      lead.name?.toLowerCase().includes(q) ||
      lead.phone?.includes(q) ||
      lead.email?.toLowerCase().includes(q) ||
      lead.category?.toLowerCase().includes(q) ||
      lead.budget?.toLowerCase().includes(q) ||
      lead.message?.toLowerCase().includes(q);

    return matchesStatus && matchesSearch;
  });

  const totalCount = leads.length;
  const newCount = leads.filter((l) => l.status === "New").length;
  const contactedCount = leads.filter((l) => l.status === "Contacted").length;
  const closedCount = leads.filter((l) => l.status === "Closed").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <span>📋 Client Enquiries & Leads</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
              {totalCount} Total
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time client leads from Enquiry Form & Contact popups saved in MongoDB & forwarded to dsinventory2026@gmail.com
          </p>
        </div>

        <button
          onClick={fetchLeads}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-all self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-amber-400" : ""}`} />
          <span>Refresh Leads</span>
        </button>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="text-2xl font-black text-white">{totalCount}</div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">Total Leads</div>
        </div>
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30">
          <div className="text-2xl font-black text-amber-400">{newCount}</div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400/80 mt-0.5">🔥 New Leads</div>
        </div>
        <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30">
          <div className="text-2xl font-black text-blue-400">{contactedCount}</div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-blue-400/80 mt-0.5">📞 Contacted</div>
        </div>
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
          <div className="text-2xl font-black text-emerald-400">{closedCount}</div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400/80 mt-0.5">✅ Closed Deals</div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-3 p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
        <div className="relative flex-1 w-full">
          <input
            type="text"
            placeholder="Search by client name, mobile, email, category, budget..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl text-xs bg-slate-950 border border-slate-800 text-white placeholder-slate-500 outline-none focus:border-amber-400"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {["All", "New", "Contacted", "In Progress", "Closed"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                statusFilter === st
                  ? "bg-amber-500 text-slate-950 font-black"
                  : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-white"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Leads List */}
      {loading ? (
        <div className="py-16 text-center space-y-3">
          <RefreshCw className="w-8 h-8 animate-spin text-amber-400 mx-auto" />
          <p className="text-xs text-slate-400">Loading client leads from MongoDB...</p>
        </div>
      ) : filteredLeads.length === 0 ? (
        <div className="py-16 text-center rounded-2xl bg-slate-900/50 border border-slate-800/60 space-y-2">
          <PhoneCall className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-sm font-bold text-white">No Enquiries Found</h3>
          <p className="text-xs text-slate-500">No client leads match your selected filter criteria.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredLeads.map((lead) => {
            const formattedDate = lead.createdAt
              ? new Date(lead.createdAt).toLocaleString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "N/A";

            return (
              <div
                key={lead._id}
                className="rounded-2xl p-5 bg-slate-900/90 border border-slate-800/80 hover:border-amber-500/30 transition-all space-y-4 shadow-lg"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-600 text-slate-950 font-black flex items-center justify-center text-sm shadow-md">
                      {lead.name ? lead.name.charAt(0).toUpperCase() : "C"}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white">{lead.name}</h4>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                          {lead.source || "Website"}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">{formattedDate}</p>
                    </div>
                  </div>

                  {/* Actions & Status */}
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <select
                      value={lead.status || "New"}
                      onChange={(e) => handleUpdateStatus(lead._id, e.target.value)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold outline-none cursor-pointer border ${
                        lead.status === "Closed"
                          ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                          : lead.status === "Contacted"
                          ? "bg-blue-500/20 text-blue-400 border-blue-500/40"
                          : lead.status === "In Progress"
                          ? "bg-purple-500/20 text-purple-400 border-purple-500/40"
                          : "bg-amber-500/20 text-amber-400 border-amber-500/40"
                      }`}
                    >
                      <option value="New" className="bg-slate-900 text-amber-400">🔥 New Lead</option>
                      <option value="Contacted" className="bg-slate-900 text-blue-400">📞 Contacted</option>
                      <option value="In Progress" className="bg-slate-900 text-purple-400">⏳ In Progress</option>
                      <option value="Closed" className="bg-slate-900 text-emerald-400">✅ Closed</option>
                    </select>

                    <button
                      onClick={() => handleDeleteLead(lead._id, lead.name)}
                      className="p-2 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      title="Delete Lead"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Grid Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Contact Phone</span>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-400">{lead.phone}</span>
                      <div className="flex items-center gap-1">
                        <a
                          href={`tel:${lead.phone}`}
                          className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white"
                          title="Call"
                        >
                          <PhoneCall className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 rounded bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                          title="WhatsApp"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Email Address</span>
                    <span className="font-semibold text-blue-400 truncate block">
                      {lead.email || "Not Provided"}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Category Interest</span>
                    <span className="font-bold text-amber-400">{lead.category}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
                    <span className="text-[10px] uppercase font-bold text-amber-400/80 block mb-1">Budget Range</span>
                    <span className="font-extrabold text-amber-400">{lead.budget}</span>
                  </div>
                </div>

                {/* Message / Requirements */}
                {lead.message && (
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Requirements / Message</span>
                    <p className="text-slate-300 leading-relaxed">{lead.message}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── BLOGS & ARTICLES PANEL ──────────────────────────────────────────────────

function BlogsPanel({ showToast }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBlog, setEditingBlog] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const emptyBlog = {
    id: "",
    slug: "",
    title: "",
    summary: "",
    category: "Investment Guides",
    author: "Surendra Soni",
    authorTitle: "Founder & MD, DS Group of Companies",
    publishedDate: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    readTime: "6 min read",
    heroImage: "",
    tags: ["Sector 85", "Gurgaon Real Estate"],
    content: [
      { heading: "Overview & Introduction", body: "" }
    ],
    isPublished: true,
  };

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/blogs");
      const d = await res.json();
      if (d.success) {
        setBlogs(d.data || []);
      }
    } catch (e) {
      showToast("Error loading blogs", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleSave = async () => {
    if (!editingBlog.title?.trim()) {
      showToast("Please enter a blog title", "error");
      return;
    }
    setSaving(true);
    try {
      const isNew = isCreating;
      const url = isNew ? "/api/admin/blogs" : `/api/admin/blogs?id=${editingBlog.id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingBlog),
      });
      const d = await res.json();
      if (d.success) {
        showToast(isNew ? "Blog published successfully!" : "Blog updated successfully!", "success");
        setEditingBlog(null);
        setIsCreating(false);
        fetchBlogs();
      } else {
        showToast(d.message || "Failed to save blog", "error");
      }
    } catch (e) {
      showToast("Error saving blog", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      const res = await fetch(`/api/admin/blogs?id=${id}`, { method: "DELETE" });
      const d = await res.json();
      if (d.success) {
        showToast("Blog deleted", "success");
        fetchBlogs();
      } else {
        showToast(d.message || "Failed to delete", "error");
      }
    } catch (e) {
      showToast("Error deleting blog", "error");
    }
  };

  const addContentSection = () => {
    setEditingBlog({
      ...editingBlog,
      content: [...(editingBlog.content || []), { heading: "", body: "" }],
    });
  };

  const updateContentSection = (idx, field, val) => {
    const updated = [...(editingBlog.content || [])];
    updated[idx] = { ...updated[idx], [field]: val };
    setEditingBlog({ ...editingBlog, content: updated });
  };

  const removeContentSection = (idx) => {
    setEditingBlog({
      ...editingBlog,
      content: (editingBlog.content || []).filter((_, i) => i !== idx),
    });
  };

  const filteredBlogs = blogs.filter(b =>
    b.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.slug?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <span>Blogs &amp; Real Estate Research</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Write, publish, and manage live articles synced with /blog and /blog/[slug].
          </p>
        </div>

        {!editingBlog && (
          <button
            onClick={() => {
              setEditingBlog({ ...emptyBlog, id: `blog-${Date.now()}` });
              setIsCreating(true);
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Write New Blog</span>
          </button>
        )}
      </div>

      {/* Editor Modal / View */}
      {editingBlog ? (
        <div className="rounded-2xl p-6 sm:p-8 mb-8 border border-slate-800" style={{ background: "rgba(10,22,40,0.85)" }}>
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white">
                {isCreating ? "Create New Blog Post" : `Editing: ${editingBlog.title || "Untitled"}`}
              </h3>
              <p className="text-xs text-slate-400">
                This post will appear live on <span className="text-amber-400">/blog</span> and <span className="text-amber-400">/blog/{editingBlog.slug || "[slug]"}</span>
              </p>
            </div>
            <button
              onClick={() => {
                setEditingBlog(null);
                setIsCreating(false);
              }}
              className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-5">
            {/* Title & Slug */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Blog Title *"
                value={editingBlog.title || ""}
                onChange={(val) => {
                  const autoSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
                  setEditingBlog({
                    ...editingBlog,
                    title: val,
                    slug: isCreating ? autoSlug : editingBlog.slug,
                  });
                }}
                placeholder="e.g. Best Property Investment in Sector 85 Gurgaon 2026"
                required
              />

              <InputField
                label="URL Slug (Auto-generated)"
                value={editingBlog.slug || ""}
                onChange={(val) => setEditingBlog({ ...editingBlog, slug: val })}
                placeholder="e.g. best-property-investment-sector-85-gurgaon-2026"
                required
              />
            </div>

            {/* Category & Hero Image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectField
                label="Category"
                value={editingBlog.category || "Investment Guides"}
                onChange={(val) => setEditingBlog({ ...editingBlog, category: val })}
                options={[
                  { value: "Investment Guides", label: "Investment Guides" },
                  { value: "Project Reviews", label: "Project Reviews" },
                  { value: "Market Analysis", label: "Market Analysis" },
                  { value: "Legal & RERA", label: "Legal & RERA" },
                  { value: "Construction Tips", label: "Construction Tips" },
                ]}
              />

              <InputField
                label="Hero Image URL (Unsplash or direct URL)"
                value={editingBlog.heroImage || ""}
                onChange={(val) => setEditingBlog({ ...editingBlog, heroImage: val })}
                placeholder="https://images.unsplash.com/photo-..."
              />
            </div>

            {/* Author, Read Time & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <InputField
                label="Author Name"
                value={editingBlog.author || "Surendra Soni"}
                onChange={(val) => setEditingBlog({ ...editingBlog, author: val })}
                placeholder="Surendra Soni"
              />

              <InputField
                label="Author Designation"
                value={editingBlog.authorTitle || "Founder & MD, DS Group"}
                onChange={(val) => setEditingBlog({ ...editingBlog, authorTitle: val })}
                placeholder="Founder & MD, DS Group"
              />

              <InputField
                label="Reading Time"
                value={editingBlog.readTime || "5 min read"}
                onChange={(val) => setEditingBlog({ ...editingBlog, readTime: val })}
                placeholder="e.g. 7 min read"
              />
            </div>

            {/* Summary / Excerpt */}
            <InputField
              label="Summary / Excerpt (Shows on card & meta description)"
              value={editingBlog.summary || ""}
              onChange={(val) => setEditingBlog({ ...editingBlog, summary: val })}
              placeholder="Provide a concise 2-3 line summary of the article..."
              rows={3}
            />

            {/* Tags */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Tags (Comma separated)
              </label>
              <input
                type="text"
                value={Array.isArray(editingBlog.tags) ? editingBlog.tags.join(", ") : ""}
                onChange={(e) => {
                  const tagsArr = e.target.value.split(",").map((t) => t.trim()).filter(Boolean);
                  setEditingBlog({ ...editingBlog, tags: tagsArr });
                }}
                placeholder="Sector 85, Gurgaon Real Estate, Godrej Air"
                className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-slate-500 outline-none transition-all focus:ring-2 focus:ring-amber-400/40"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
              />
            </div>

            {/* Structured Content Sections */}
            <div className="pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <label className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Article Content Sections (Headings &amp; Paragraphs)
                </label>
                <button
                  type="button"
                  onClick={addContentSection}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5 text-amber-400" />
                  <span>Add Section</span>
                </button>
              </div>

              <div className="space-y-4">
                {(editingBlog.content || []).map((sec, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-800/80 bg-slate-950/60 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold text-amber-400 uppercase">Section {idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeContentSection(idx)}
                        className="text-slate-500 hover:text-red-400 transition-colors p-1"
                        title="Remove Section"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <InputField
                      label="Section Heading (H2)"
                      value={sec.heading || ""}
                      onChange={(val) => updateContentSection(idx, "heading", val)}
                      placeholder="e.g. Why Sector 85 is the #1 corridor"
                    />

                    <InputField
                      label="Section Body Content"
                      value={sec.body || ""}
                      onChange={(val) => updateContentSection(idx, "body", val)}
                      placeholder="Write your article text here. Markdown and bullet points supported."
                      rows={5}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setEditingBlog(null);
                  setIsCreating(false);
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800/60 transition-colors"
              >
                Cancel
              </button>

              <SaveBtn
                loading={saving}
                onClick={handleSave}
                label={isCreating ? "Publish Live Article" : "Save & Update"}
              />
            </div>
          </div>
        </div>
      ) : null}

      {/* Search Bar */}
      <div className="mb-6 flex items-center gap-3">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search blogs by title, category, or slug..."
          className="w-full max-w-md px-4 py-2.5 rounded-xl text-xs text-white placeholder-slate-500 outline-none transition-all focus:ring-2 focus:ring-amber-400/40"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
        />
        <button
          onClick={fetchBlogs}
          className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
          title="Refresh"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Blogs Table / Cards List */}
      {loading ? (
        <div className="text-center py-16 text-slate-500 text-xs flex items-center justify-center gap-2">
          <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
          <span>Loading articles from database...</span>
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="text-center py-16 rounded-2xl border border-slate-800 bg-slate-900/40 p-8">
          <BookOpen className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <p className="text-sm font-semibold text-slate-300">No blog articles found</p>
          <p className="text-xs text-slate-500 mt-1">Click &quot;Write New Blog&quot; to publish your first article.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredBlogs.map((blog) => (
            <div
              key={blog.id || blog.slug}
              className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-slate-700 transition-all flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400/10 text-amber-400 border border-amber-400/20">
                    {blog.category}
                  </span>
                  <span className="text-[10px] text-slate-500">{blog.publishedDate || "Recently Published"}</span>
                </div>

                <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2 mb-2 font-outfit">
                  {blog.title}
                </h4>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                  {blog.summary}
                </p>

                <div className="flex items-center gap-2 text-[10px] text-slate-500 mb-4">
                  <span>By {blog.author}</span>
                  <span>•</span>
                  <span>{blog.readTime}</span>
                  <span>•</span>
                  <span>{(blog.content || []).length} sections</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <a
                  href={`/blog/${blog.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-semibold text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview Live</span>
                </a>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingBlog(blog);
                      setIsCreating(false);
                    }}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-amber-400/20 hover:text-amber-400 text-slate-300 transition-colors"
                    title="Edit Blog"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleDelete(blog.id, blog.title)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-500/20 hover:text-red-400 text-slate-300 transition-colors"
                    title="Delete Blog"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── MAIN ADMIN DASHBOARD ────────────────────────────────────────────────────

export default function AdminDashboard({ adminEmail }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [toast, setToast] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const showToast = useCallback((msg, type = "success") => {
    setToast({ msg, type, key: Date.now() });
  }, []);

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview": return <OverviewPanel showToast={showToast} adminEmail={adminEmail} />;
      case "leads": return <LeadsPanel showToast={showToast} />;
      case "blogs": return <BlogsPanel showToast={showToast} />;
      case "hero": return <HeroPanel showToast={showToast} />;
      case "valuable-properties": return <ValuablePropertiesPanel showToast={showToast} />;
      case "properties": return <PropertiesPanel showToast={showToast} />;
      case "about": return <AboutPanel showToast={showToast} />;
      case "services": return <ServicesPanel showToast={showToast} />;
      case "testimonials": return <TestimonialsPanel showToast={showToast} />;
      case "social": return <SocialPanel showToast={showToast} />;
      case "footer": return <FooterPanel showToast={showToast} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: "#050d1a", fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
      {/* Toast */}
      {toast && <Toast key={toast.key} msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      {/* Sidebar */}
      <aside
        className={`shrink-0 flex flex-col transition-all duration-300 ${sidebarOpen ? "w-64" : "w-16"}`}
        style={{ background: "rgba(5,12,25,0.98)", borderRight: "1px solid rgba(255,255,255,0.06)", minHeight: "100vh" }}
      >
        {/* Logo */}
        <div className="p-5 border-b border-slate-900 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "linear-gradient(135deg, #1e40af, #C9A96E)" }}>
            <Building2 className="w-5 h-5 text-white" />
          </div>
          {sidebarOpen && (
            <div className="overflow-hidden">
              <p className="text-xs font-extrabold text-white tracking-tight leading-tight">DS GROUP</p>
              <p className="text-[9px] font-semibold text-amber-400 uppercase tracking-wider">Admin Panel</p>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="ml-auto text-slate-600 hover:text-slate-400 transition-colors shrink-0">
            <Menu className="w-4 h-4" />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 py-4 px-2 space-y-1">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 ${activeTab === id ? "text-white" : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
                }`}
              style={activeTab === id ? { background: "linear-gradient(135deg, rgba(201,169,110,0.15), rgba(30,64,175,0.15))", border: "1px solid rgba(201,169,110,0.2)" } : {}}
              title={!sidebarOpen ? label : undefined}
            >
              <Icon className={`w-4 h-4 shrink-0 ${activeTab === id ? "text-amber-400" : ""}`} />
              {sidebarOpen && <span className="text-xs font-semibold truncate">{label}</span>}
              {sidebarOpen && activeTab === id && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-400" />}
            </button>
          ))}
        </nav>

        {/* Bottom: Logout */}
        <div className="p-3 border-t border-slate-900">
          {sidebarOpen && (
            <div className="px-3 py-2 mb-2 rounded-lg" style={{ background: "rgba(255,255,255,0.02)" }}>
              <p className="text-[10px] text-slate-500 truncate">{adminEmail}</p>
            </div>
          )}
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
            title="Logout">
            <LogOut className="w-4 h-4 shrink-0" />
            {sidebarOpen && <span className="text-xs font-semibold">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto px-6 py-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
