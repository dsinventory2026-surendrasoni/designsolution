"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard, Home, Building2, Users, Share2,
  FileText, Settings, LogOut, Plus, Pencil, Trash2, Save,
  X, ChevronDown, ChevronUp, CheckCircle2, AlertCircle,
  RefreshCw, Eye, Building, MapPin, PhoneCall, Mail, MessageSquare,
  Image as ImageIcon, ArrowLeft, ArrowRight, Menu, Sparkles, Copy, ExternalLink, BookOpen,
  Upload, ZoomIn, ZoomOut, Tag, ShieldCheck, UserCheck, Award, Globe
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
  const cls = "w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-slate-500 outline-none transition-all focus:ring-2 focus:ring-amber-400/40 focus:border-orange-400/60";
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
        <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
          <Icon className="w-4 h-4 text-orange-400" />
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
      style={{ background: loading ? "rgba(255,121,0,0.5)" : "linear-gradient(135deg, #FF7900, #F16E00)", boxShadow: "0 4px 15px rgba(255,121,0,0.2)" }}
    >
      {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
      <span>{loading ? "Saving..." : label}</span>
    </button>
  );
}

function Badge({ text, color = "amber" }) {
  const colors = {
    amber: "bg-orange-500/10 text-orange-400 border-orange-500/20",
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
  { id: "inventories", label: "🏢 Inventories", icon: Building2 },
  { id: "properties", label: "Properties", icon: Building },
  { id: "about", label: "About Section", icon: Users },
  { id: "services", label: "Services", icon: Settings },
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
          <button onClick={addBadge} className="flex items-center gap-2 text-xs text-orange-400 hover:text-orange-300 font-semibold py-2">
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
              <button onClick={() => setEditingProp({ ...editingProp, images: [...(editingProp.images || []), ""] })} className="flex items-center gap-2 text-xs text-orange-400 font-semibold py-1">
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
              <button onClick={() => setEditingProp({ ...editingProp, amenities: [...(editingProp.amenities || []), ""] })} className="flex items-center gap-2 text-xs text-orange-400 font-semibold py-1">
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
              <button onClick={() => setEditingProp({ ...editingProp, specifications: [...(editingProp.specifications || []), { label: "", value: "" }] })} className="flex items-center gap-2 text-xs text-orange-400 font-semibold py-1">
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
          style={{ background: "linear-gradient(135deg, #FF7900, #F16E00)", boxShadow: "0 4px 15px rgba(255,121,0,0.2)" }}>
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
              style={{ background: filterCat === c ? "linear-gradient(135deg, #FF7900, #F16E00)" : "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-slate-400 text-sm py-12 text-center"><RefreshCw className="w-6 h-6 animate-spin mx-auto mb-3 text-orange-400" />Loading properties...</div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filtered.map((prop) => (
            <div key={prop.id} className="flex items-center gap-4 p-4 rounded-2xl transition-all hover:border-orange-400/20"
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

// ─── IMAGE UPLOAD & CROPPER MODAL ──────────────────────────────────────────

function ImageCropperModal({ isOpen, onClose, onSave, title = "Select & Crop Image" }) {
  const [activeTab, setActiveTab] = useState("file"); // "file" | "url"
  const [urlInput, setUrlInput] = useState("");
  const [previewSrc, setPreviewSrc] = useState("");
  const [rawFile, setRawFile] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState("image.jpg");
  const canvasRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      setPreviewSrc("");
      setUrlInput("");
      setRawFile(null);
      setZoom(1);
      setPanX(0);
      setPanY(0);
      setUploading(false);
    }
  }, [isOpen]);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setRawFile(file);
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewSrc(reader.result);
        setZoom(1);
        setPanX(0);
        setPanY(0);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLoadUrl = () => {
    if (urlInput.trim()) {
      setPreviewSrc(urlInput.trim());
      setFileName("url-image.jpg");
      setRawFile(null);
      setZoom(1);
      setPanX(0);
      setPanY(0);
    }
  };

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    const size = 360;
    canvas.width = size;
    canvas.height = size;

    ctx.clearRect(0, 0, size, size);
    ctx.fillStyle = "#0a1322";
    ctx.fillRect(0, 0, size, size);

    const iw = img.naturalWidth || img.width || 360;
    const ih = img.naturalHeight || img.height || 360;
    const baseScale = Math.max(size / iw, size / ih);
    const finalScale = baseScale * zoom;

    const dw = iw * finalScale;
    const dh = ih * finalScale;
    const dx = (size - dw) / 2 + panX;
    const dy = (size - dh) / 2 + panY;

    try {
      ctx.drawImage(img, dx, dy, dw, dh);
    } catch (e) {
      console.warn("Canvas draw error:", e);
    }
  }, [zoom, panX, panY]);

  useEffect(() => {
    if (previewSrc) {
      draw();
    }
  }, [previewSrc, zoom, panX, panY, draw]);

  // Direct upload of original file without cropping
  const handleDirectUploadRaw = async () => {
    if (!rawFile) {
      alert("Please choose an image from your computer first.");
      return;
    }
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", rawFile);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const d = await res.json();
      setUploading(false);

      if (d.success && d.url) {
        onSave(d.url);
        onClose();
      } else {
        alert(d.message || "Upload failed. Please check file size or permissions.");
      }
    } catch (err) {
      setUploading(false);
      alert("Error uploading image: " + err.message);
    }
  };

  const handleSave = async () => {
    if (activeTab === "url" && urlInput.trim() && !previewSrc) {
      onSave(urlInput.trim());
      onClose();
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas || !previewSrc) {
      if (urlInput.trim()) {
        onSave(urlInput.trim());
        onClose();
      } else {
        alert("Please select an image file or enter a valid URL.");
      }
      return;
    }

    try {
      setUploading(true);

      if (canvas.toBlob) {
        canvas.toBlob(async (blob) => {
          if (!blob) {
            uploadBase64Fallback();
            return;
          }
          try {
            const formData = new FormData();
            formData.append("file", blob, fileName || "cropped-image.jpg");
            const res = await fetch("/api/admin/upload", {
              method: "POST",
              body: formData,
            });
            const d = await res.json();
            setUploading(false);

            if (d.success && d.url) {
              onSave(d.url);
              onClose();
            } else {
              alert(d.message || "Upload failed. Please check file size or permissions.");
            }
          } catch (e) {
            uploadBase64Fallback();
          }
        }, "image/jpeg", 0.9);
      } else {
        uploadBase64Fallback();
      }
    } catch (err) {
      setUploading(false);
      alert("Error uploading image: " + err.message);
    }
  };

  const uploadBase64Fallback = async () => {
    try {
      const canvas = canvasRef.current;
      const base64Data = canvas.toDataURL("image/jpeg", 0.88);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          base64Data,
          filename: fileName || "photo.jpg",
        }),
      });
      const d = await res.json();
      setUploading(false);

      if (d.success && d.url) {
        onSave(d.url);
        onClose();
      } else {
        alert(d.message || "Upload failed. Please check file size or permissions.");
      }
    } catch (err) {
      setUploading(false);
      alert("Error uploading image: " + err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div
        className="w-full max-w-xl rounded-3xl p-6 sm:p-7 space-y-5 shadow-2xl relative max-h-[92vh] overflow-y-auto"
        style={{ background: "#091426", border: "1px solid rgba(255,121,0,0.3)" }}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
              <Upload className="w-4 h-4 text-orange-400" />
            </div>
            <h3 className="text-base font-bold text-white">{title}</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Source Select Tabs */}
        <div className="flex gap-2 p-1 rounded-xl bg-[#111827] border border-slate-800">
          <button
            onClick={() => setActiveTab("file")}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeTab === "file" ? "bg-orange-500 text-slate-950 font-black shadow-md" : "text-slate-400 hover:text-white"}`}
          >
            Select from Computer
          </button>
          <button
            onClick={() => setActiveTab("url")}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeTab === "url" ? "bg-orange-500 text-slate-950 font-black shadow-md" : "text-slate-400 hover:text-white"}`}
          >
            Paste Direct Image URL
          </button>
        </div>

        {/* File Input vs URL Input */}
        {activeTab === "file" ? (
          <div className="space-y-3">
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700 hover:border-orange-400/60 rounded-2xl p-4 cursor-pointer bg-[#111827]/60 transition-colors group">
              <Upload className="w-7 h-7 text-slate-500 group-hover:text-orange-400 mb-2 transition-colors" />
              <span className="text-xs font-bold text-white">Click to choose image from computer</span>
              <span className="text-[10px] text-slate-500 mt-1">PNG, JPG, WEBP supported</span>
              <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
            </label>

            {rawFile && (
              <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/25 flex items-center justify-between gap-3">
                <div className="text-xs text-orange-200 truncate">
                  Selected: <span className="font-bold text-white">{rawFile.name}</span>
                </div>
                <button
                  type="button"
                  onClick={handleDirectUploadRaw}
                  disabled={uploading}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors shrink-0 shadow-xs cursor-pointer"
                >
                  {uploading ? "Uploading..." : "⚡ Use Directly (No Crop)"}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="https://images.unsplash.com/..."
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl text-xs bg-[#111827] border border-slate-800 text-white outline-none focus:border-orange-400"
            />
            <button
              onClick={handleLoadUrl}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-orange-500/20 text-orange-300 border border-orange-500/30 hover:bg-orange-500/30 cursor-pointer"
            >
              Load
            </button>
          </div>
        )}

        {/* Reference image for drawing (NOT display:none) */}
        {previewSrc && (
          <img
            ref={imgRef}
            src={previewSrc}
            alt="Source"
            crossOrigin={previewSrc.startsWith("http") ? "anonymous" : undefined}
            onLoad={draw}
            style={{ position: "fixed", top: "-9999px", left: "-9999px", opacity: 0, pointerEvents: "none" }}
          />
        )}

        {/* Interactive Crop / Zoom Preview */}
        {previewSrc && (
          <div className="space-y-4 pt-2">
            <div className="flex justify-center">
              <div className="relative rounded-2xl overflow-hidden border-2 border-orange-400/50 shadow-2xl bg-[#111827]">
                <canvas ref={canvasRef} width={360} height={360} className="w-64 h-64 sm:w-72 sm:h-72 object-cover block" />
                <div className="absolute inset-0 border border-white/10 pointer-events-none rounded-2xl" />
              </div>
            </div>

            {/* Zoom / Size Control (Chhota - Bada Slider) */}
            <div className="space-y-2 p-3 rounded-xl bg-[#111827] border border-slate-800">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <ZoomIn className="w-3.5 h-3.5 text-orange-400" />
                  Zoom / Size (Chhota - Bada):
                </span>
                <span className="text-orange-400 font-mono">{zoom.toFixed(2)}x</span>
              </div>
              <div className="flex items-center gap-3">
                <ZoomOut className="w-4 h-4 text-slate-500 shrink-0" />
                <input
                  type="range"
                  min="0.6"
                  max="2.8"
                  step="0.05"
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="flex-1 accent-amber-400 cursor-pointer"
                />
                <ZoomIn className="w-4 h-4 text-orange-400 shrink-0" />
              </div>

              {/* Pan Position Controls */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-[11px]">
                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>Move Left / Right</span>
                    <span className="text-slate-500 font-mono">{panX}px</span>
                  </div>
                  <input
                    type="range"
                    min="-140"
                    max="140"
                    step="5"
                    value={panX}
                    onChange={(e) => setPanX(parseInt(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>Move Up / Down</span>
                    <span className="text-slate-400 font-mono">{panY}px</span>
                  </div>
                  <input
                    type="range"
                    min="-140"
                    max="140"
                    step="5"
                    value={panY}
                    onChange={(e) => setPanY(parseInt(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
          <button
            onClick={onClose}
            disabled={uploading}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={uploading}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 transition-all shadow-lg cursor-pointer"
            style={{ background: uploading ? "#888" : "linear-gradient(135deg, #FF7900, #F16E00)" }}
          >
            {uploading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            <span>{uploading ? "Uploading Image..." : "Save Cropped Image"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── ABOUT PANEL (3 SECTIONS + DYNAMIC SEO KEYWORDS + IMAGE CROPPER) ───────

function AboutPanel({ showToast }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [aboutSubTab, setAboutSubTab] = useState("company"); // "company" | "owner" | "employees"

  // Modal states for image cropping
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [cropTarget, setCropTarget] = useState(null); // { type: 'owner' | 'employee', empIndex?: number }

  // New Keyword input in SEO manager
  const [newKeyword, setNewKeyword] = useState("");

  // Office Photo inputs
  const [newOfficeImageUrl, setNewOfficeImageUrl] = useState("");

  // Employee editing modal
  const [editingEmp, setEditingEmp] = useState(null);
  const [isAddingEmp, setIsAddingEmp] = useState(false);

  useEffect(() => {
    fetch("/api/admin/about")
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.data) {
          const loaded = d.data;
          // Ensure about object structure is fully initialized
          if (!loaded.about) loaded.about = {};
          if (!loaded.about.companyDetails) loaded.about.companyDetails = {};
          if (!loaded.about.companyDetails.seoKeywords) loaded.about.companyDetails.seoKeywords = [];
          if (!loaded.about.ownerDetails) loaded.about.ownerDetails = {};
          if (!loaded.about.ownerDetails.achievements) loaded.about.ownerDetails.achievements = [];
          if (!loaded.about.employees) loaded.about.employees = [];

          setData(loaded);
        }
        setLoading(false);
      });
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          about: data.about,
          owner: data.about.ownerDetails,
          brand: data.brand,
        }),
      });
      const d = await res.json();
      setSaving(false);
      showToast(d.success ? "About section, team & SEO keywords saved to MongoDB!" : d.message, d.success ? "success" : "error");
    } catch (err) {
      setSaving(false);
      showToast("Error saving to database: " + err.message, "error");
    }
  };

  // SEO Keywords helpers
  const addKeyword = () => {
    if (!newKeyword.trim()) return;
    const current = data.about.companyDetails.seoKeywords || [];
    if (!current.includes(newKeyword.trim())) {
      setData({
        ...data,
        about: {
          ...data.about,
          companyDetails: {
            ...data.about.companyDetails,
            seoKeywords: [...current, newKeyword.trim()],
          },
        },
      });
    }
    setNewKeyword("");
  };

  const removeKeyword = (idx) => {
    const current = [...(data.about.companyDetails.seoKeywords || [])];
    current.splice(idx, 1);
    setData({
      ...data,
      about: {
        ...data.about,
        companyDetails: {
          ...data.about.companyDetails,
          seoKeywords: current,
        },
      },
    });
  };

  const quickKeywords = [
    "Luxury flats Sector 85 Gurgaon",
    "Commercial property Dwarka Expressway",
    "Freehold plots Gurgaon",
    "Turnkey construction Gurgaon",
    "Best property consultant Gurugram",
    "Surendra Soni real estate developer",
  ];

  // Image Cropping Callback
  const handleCroppedImage = (url) => {
    if (!cropTarget) return;

    if (cropTarget.type === "owner") {
      setData({
        ...data,
        about: {
          ...data.about,
          ownerDetails: {
            ...data.about.ownerDetails,
            photo: url,
          },
        },
      });
      showToast("Owner photo updated & cropped!", "success");
    } else if (cropTarget.type === "editingEmp" && editingEmp) {
      setEditingEmp({
        ...editingEmp,
        photo: url,
      });
      showToast("Employee photo updated!", "success");
    } else if (cropTarget.type === "officePhoto") {
      const currentImages = data.about?.companyDetails?.images || [];
      setData({
        ...data,
        about: {
          ...data.about,
          companyDetails: {
            ...data.about.companyDetails,
            images: [...currentImages, url],
          },
        },
      });
      showToast("Office photo uploaded! Remember to Save Changes.", "success");
    }
    setCropTarget(null);
  };

  // Direct file upload from computer (instant upload without cropper modal)
  const [directUploading, setDirectUploading] = useState(null); // 'owner' | 'editingEmp' | null

  const handleDirectUpload = async (file, targetType) => {
    if (!file) return;
    try {
      setDirectUploading(targetType);
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const d = await res.json();
      setDirectUploading(null);

      if (d.success && d.url) {
        if (targetType === "owner") {
          setData((prev) => ({
            ...prev,
            about: {
              ...prev.about,
              ownerDetails: {
                ...prev.about.ownerDetails,
                photo: d.url,
              },
            },
          }));
          showToast("Owner photo uploaded from computer! Remember to Save Changes.", "success");
        } else if (targetType === "editingEmp") {
          setEditingEmp((prev) => ({
            ...prev,
            photo: d.url,
          }));
          showToast("Employee photo uploaded from computer!", "success");
        }
      } else {
        alert(d.message || "Upload failed. Please check file size or permissions.");
      }
    } catch (err) {
      setDirectUploading(null);
      alert("Error uploading image: " + err.message);
    }
  };

  const addOfficeImageUrl = () => {
    if (!newOfficeImageUrl.trim()) return;
    const currentImages = data.about?.companyDetails?.images || [];
    setData({
      ...data,
      about: {
        ...data.about,
        companyDetails: {
          ...data.about.companyDetails,
          images: [...currentImages, newOfficeImageUrl.trim()],
        },
      },
    });
    setNewOfficeImageUrl("");
    showToast("Office photo added to gallery! Remember to Save Changes.", "success");
  };

  const removeOfficeImage = (idx) => {
    const currentImages = [...(data.about?.companyDetails?.images || [])];
    currentImages.splice(idx, 1);
    setData({
      ...data,
      about: {
        ...data.about,
        companyDetails: {
          ...data.about.companyDetails,
          images: currentImages,
        },
      },
    });
    showToast("Office photo removed! Remember to Save Changes.", "success");
  };

  // Employee CRUD
  const saveEmployee = () => {
    if (!editingEmp.name?.trim()) {
      alert("Please enter employee name");
      return;
    }

    const currentList = [...(data.about.employees || [])];
    if (isAddingEmp) {
      const newEmp = {
        ...editingEmp,
        id: editingEmp.id || `emp-${Date.now()}`,
      };
      currentList.push(newEmp);
    } else {
      const idx = currentList.findIndex((e) => e.id === editingEmp.id);
      if (idx >= 0) {
        currentList[idx] = editingEmp;
      }
    }

    setData({
      ...data,
      about: {
        ...data.about,
        employees: currentList,
      },
    });

    setEditingEmp(null);
    setIsAddingEmp(false);
    showToast(isAddingEmp ? "Employee added to list! Remember to Save Changes." : "Employee updated! Remember to Save Changes.", "success");
  };

  const deleteEmployee = (id) => {
    if (!confirm("Are you sure you want to delete this employee?")) return;
    const currentList = (data.about.employees || []).filter((e) => e.id !== id);
    setData({
      ...data,
      about: {
        ...data.about,
        employees: currentList,
      },
    });
    showToast("Employee removed. Click Save Changes to update MongoDB.", "success");
  };

  if (loading || !data) return <div className="text-slate-400 text-sm py-12 text-center">Loading About Us config from MongoDB...</div>;

  const company = data.about?.companyDetails || {};
  const owner = data.about?.ownerDetails || {};
  const employees = data.about?.employees || [];

  return (
    <div>
      {/* Image Cropper Modal */}
      <ImageCropperModal
        isOpen={cropModalOpen}
        onClose={() => { setCropModalOpen(false); setCropTarget(null); }}
        onSave={handleCroppedImage}
        title={
          cropTarget?.type === "owner"
            ? "Crop & Adjust Owner Photo"
            : cropTarget?.type === "officePhoto"
            ? "Upload & Crop Office Photo"
            : "Crop & Adjust Employee Photo"
        }
      />

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <span>About Us Management</span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-orange-500/20 text-orange-300 border border-orange-500/30">
              MongoDB Live
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage Company Profile, Owner Profile, Team Directory & Dynamic SEO Keywords for /about
          </p>
        </div>
        <SaveBtn loading={saving} onClick={save} label="Save to MongoDB" />
      </div>

      {/* 3 Main Sub-Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 mb-6 overflow-x-auto">
        <button
          onClick={() => setAboutSubTab("company")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${aboutSubTab === "company" ? "bg-orange-500 text-slate-950 font-black shadow-lg" : "text-slate-400 hover:text-white"}`}
        >
          <Building2 className="w-4 h-4" />
          <span>1. 🏢 Company Details & SEO</span>
        </button>
        <button
          onClick={() => setAboutSubTab("owner")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${aboutSubTab === "owner" ? "bg-orange-500 text-slate-950 font-black shadow-lg" : "text-slate-400 hover:text-white"}`}
        >
          <UserCheck className="w-4 h-4" />
          <span>2. 👤 Owner / Founder Details</span>
        </button>
        <button
          onClick={() => setAboutSubTab("employees")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${aboutSubTab === "employees" ? "bg-orange-500 text-slate-950 font-black shadow-lg" : "text-slate-400 hover:text-white"}`}
        >
          <Users className="w-4 h-4" />
          <span>3. 👥 Employee Directory ({employees.length})</span>
        </button>
      </div>

      {/* ════════════════════════════════════════════════════════════
          SUB-TAB 1: COMPANY DETAILS & DYNAMIC SEO KEYWORDS
      ════════════════════════════════════════════════════════════ */}
      {aboutSubTab === "company" && (
        <div className="space-y-6">

          {/* Dynamic SEO Keywords Manager (CRITICAL USER REQUEST) */}
          <SectionCard title="🔑 Dynamic SEO Keywords Manager (Direct Google Impact)" icon={Tag}>
            <div className="space-y-4">
              <p className="text-xs text-slate-300">
                Add target keywords here. They are directly embedded into the page&apos;s <strong>meta keywords</strong>, <strong>JSON-LD Organization Schema</strong>, and displayed as dynamic specialization tags on the About Us page to drive Google ranking.
              </p>

              {/* Input + Add */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Luxury 3 BHK Sector 85 Gurgaon, Best builder Gurugram..."
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addKeyword(); } }}
                  className="flex-1 px-4 py-2.5 rounded-xl text-xs bg-[#111827] border border-slate-800 text-white placeholder-slate-500 outline-none focus:border-orange-400"
                />
                <button
                  type="button"
                  onClick={addKeyword}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-orange-400 hover:bg-amber-300 transition-colors shrink-0"
                >
                  <Plus className="w-3.5 h-3.5 inline mr-1" /> Add Keyword
                </button>
              </div>

              {/* Active Keywords Tags */}
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Active SEO Keywords ({company.seoKeywords?.length || 0}):
                </div>
                <div className="flex flex-wrap gap-2 min-h-12 p-3 rounded-xl bg-[#111827]/80 border border-slate-800/80">
                  {(company.seoKeywords || []).map((kw, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-orange-500/15 text-orange-300 border border-orange-500/30"
                    >
                      <span>{kw}</span>
                      <button
                        type="button"
                        onClick={() => removeKeyword(idx)}
                        className="p-0.5 hover:text-red-400 transition-colors"
                        title="Remove keyword"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  {(!company.seoKeywords || company.seoKeywords.length === 0) && (
                    <span className="text-xs text-slate-500 italic">No custom keywords added yet.</span>
                  )}
                </div>
              </div>

              {/* Quick suggestions */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Quick Suggestions (Click to Add):</span>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {quickKeywords.map((qk) => (
                    <button
                      key={qk}
                      type="button"
                      onClick={() => {
                        if (!company.seoKeywords?.includes(qk)) {
                          setData({
                            ...data,
                            about: {
                              ...data.about,
                              companyDetails: {
                                ...data.about.companyDetails,
                                seoKeywords: [...(company.seoKeywords || []), qk],
                              },
                            },
                          });
                        }
                      }}
                      className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-white/5 border border-white/10 text-slate-300 hover:text-orange-300 hover:border-orange-400/40 transition-colors"
                    >
                      + {qk}
                    </button>
                  ))}
                </div>
              </div>

              {/* SEO Meta Title & Description */}
              <div className="pt-4 border-t border-slate-800 grid grid-cols-1 gap-4">
                <InputField
                  label="SEO Meta Title"
                  value={company.metaTitle || ""}
                  onChange={(v) =>
                    setData({
                      ...data,
                      about: {
                        ...data.about,
                        companyDetails: { ...data.about.companyDetails, metaTitle: v },
                      },
                    })
                  }
                  placeholder="About DS Group of Companies | Real Estate Developer Sector 85 Gurgaon"
                />
                <InputField
                  label="SEO Meta Description"
                  rows={2}
                  value={company.metaDescription || ""}
                  onChange={(v) =>
                    setData({
                      ...data,
                      about: {
                        ...data.about,
                        companyDetails: { ...data.about.companyDetails, metaDescription: v },
                      },
                    })
                  }
                  placeholder="Discover DS Group of Companies — Premier real estate developer in Sector 85 Gurugram..."
                />
              </div>
            </div>
          </SectionCard>

          {/* Company Hero Headline & Subtitle */}
          <SectionCard title="Company Page Hero & Main Headline" icon={Sparkles}>
            <div className="space-y-4">
              <InputField
                label="Main Hero Headline (H2)"
                value={company.heroHeading || ""}
                onChange={(v) =>
                  setData({
                    ...data,
                    about: {
                      ...data.about,
                      companyDetails: { ...data.about.companyDetails, heroHeading: v },
                    },
                  })
                }
                placeholder="Building Trust. Creating Landmarks. Delivering Value Since 2008."
              />
              <InputField
                label="Hero Subtitle / Description"
                rows={2}
                value={company.heroSubheading || ""}
                onChange={(v) =>
                  setData({
                    ...data,
                    about: {
                      ...data.about,
                      companyDetails: { ...data.about.companyDetails, heroSubheading: v },
                    },
                  })
                }
                placeholder="Discover the story, mission, credentials, and milestones of DS Group of Companies..."
              />
            </div>
          </SectionCard>

          {/* Key Animated Statistics Panel */}
          <SectionCard title="Key Statistics (4 Stat Cards on /about/company)" icon={Award}>
            <div className="space-y-3">
              <p className="text-xs text-slate-400">
                These 4 statistics cards are dynamically displayed in the &quot;At a Glance&quot; animated counter section.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[0, 1, 2, 3].map((idx) => {
                  const currentStats = company.stats || [
                    { label: "Projects Delivered", value: "25+" },
                    { label: "Happy Families", value: "500+" },
                    { label: "Years Experience", value: "15+" },
                    { label: "Regulatory Compliance", value: "100%" },
                  ];
                  const st = currentStats[idx] || { label: "", value: "" };
                  return (
                    <div key={idx} className="p-3.5 rounded-xl bg-[#111827] border border-slate-800 space-y-2">
                      <span className="text-[10px] font-bold text-orange-400 uppercase tracking-wider">Stat #{idx + 1}</span>
                      <InputField
                        label="Number / Value"
                        value={st.value}
                        onChange={(v) => {
                          const updated = [...currentStats];
                          updated[idx] = { ...updated[idx], value: v };
                          setData({ ...data, about: { ...data.about, companyDetails: { ...company, stats: updated } } });
                        }}
                        placeholder="e.g. 25+ or 100%"
                      />
                      <InputField
                        label="Label / Title"
                        value={st.label}
                        onChange={(v) => {
                          const updated = [...currentStats];
                          updated[idx] = { ...updated[idx], label: v };
                          setData({ ...data, about: { ...data.about, companyDetails: { ...company, stats: updated } } });
                        }}
                        placeholder="Projects Delivered"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </SectionCard>

          {/* Growth Timeline Manager */}
          <SectionCard title="Company Growth Timeline & Milestones" icon={Building2}>
            <div className="space-y-3">
              <p className="text-xs text-slate-400">
                Manage the company journey milestones displayed in the interactive timeline section.
              </p>
              {(company.timeline || []).map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#111827] border border-slate-800 flex items-start gap-4">
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <InputField
                      label="Year"
                      value={item.year || ""}
                      onChange={(v) => {
                        const updated = [...(company.timeline || [])];
                        updated[idx] = { ...updated[idx], year: v };
                        setData({ ...data, about: { ...data.about, companyDetails: { ...company, timeline: updated } } });
                      }}
                      placeholder="e.g. 2008"
                    />
                    <InputField
                      label="Event / Milestone Title"
                      value={item.event || ""}
                      onChange={(v) => {
                        const updated = [...(company.timeline || [])];
                        updated[idx] = { ...updated[idx], event: v };
                        setData({ ...data, about: { ...data.about, companyDetails: { ...company, timeline: updated } } });
                      }}
                      placeholder="Company Founded"
                    />
                    <InputField
                      label="Description"
                      value={item.desc || ""}
                      onChange={(v) => {
                        const updated = [...(company.timeline || [])];
                        updated[idx] = { ...updated[idx], desc: v };
                        setData({ ...data, about: { ...data.about, companyDetails: { ...company, timeline: updated } } });
                      }}
                      placeholder="Short milestone narrative..."
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = (company.timeline || []).filter((_, i) => i !== idx);
                      setData({ ...data, about: { ...data.about, companyDetails: { ...company, timeline: updated } } });
                    }}
                    className="mt-6 p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                    title="Remove Milestone"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => {
                  const updated = [...(company.timeline || []), { year: "2026", event: "New Expansion", desc: "Description of new milestone." }];
                  setData({ ...data, about: { ...data.about, companyDetails: { ...company, timeline: updated } } });
                }}
                className="flex items-center gap-2 text-xs text-orange-400 font-semibold py-2"
              >
                <Plus className="w-4 h-4" /> Add Timeline Milestone
              </button>
            </div>
          </SectionCard>

          {/* Why Choose Us / Highlights */}
          <SectionCard title="Why Choose Us / Highlights (6 Cards)" icon={ShieldCheck}>
            <div className="space-y-3">
              <p className="text-xs text-slate-400">
                Key value propositions displayed in the &quot;Why Choose DS Group&quot; grid.
              </p>
              {(company.highlights || []).map((h, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#111827] border border-slate-800 flex items-start gap-4">
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <InputField
                      label="Title"
                      value={h.title || ""}
                      onChange={(v) => {
                        const updated = [...(company.highlights || [])];
                        updated[idx] = { ...updated[idx], title: v };
                        setData({ ...data, about: { ...data.about, companyDetails: { ...company, highlights: updated } } });
                      }}
                      placeholder="e.g. Transparent Transactions"
                    />
                    <InputField
                      label="Description"
                      value={h.description || ""}
                      onChange={(v) => {
                        const updated = [...(company.highlights || [])];
                        updated[idx] = { ...updated[idx], description: v };
                        setData({ ...data, about: { ...data.about, companyDetails: { ...company, highlights: updated } } });
                      }}
                      placeholder="Description of the value proposition..."
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = (company.highlights || []).filter((_, i) => i !== idx);
                      setData({ ...data, about: { ...data.about, companyDetails: { ...company, highlights: updated } } });
                    }}
                    className="mt-6 p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                    title="Remove Highlight"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => {
                  const updated = [...(company.highlights || []), { title: "New Highlight", description: "Highlight description..." }];
                  setData({ ...data, about: { ...data.about, companyDetails: { ...company, highlights: updated } } });
                }}
                className="flex items-center gap-2 text-xs text-orange-400 font-semibold py-2"
              >
                <Plus className="w-4 h-4" /> Add Highlight Card
              </button>
            </div>
          </SectionCard>

          {/* Core Values Manager */}
          <SectionCard title="Core Corporate Values" icon={Tag}>
            <div className="space-y-3">
              <p className="text-xs text-slate-400">
                Core corporate values displayed in the &quot;Mission • Vision • Values&quot; section.
              </p>
              {(company.coreValues || []).map((val, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#111827] border border-slate-800 flex items-start gap-4">
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <InputField
                      label="Value Title"
                      value={val.title || ""}
                      onChange={(v) => {
                        const updated = [...(company.coreValues || [])];
                        updated[idx] = { ...updated[idx], title: v };
                        setData({ ...data, about: { ...data.about, companyDetails: { ...company, coreValues: updated } } });
                      }}
                      placeholder="e.g. Integrity"
                    />
                    <InputField
                      label="Value Description"
                      value={val.description || ""}
                      onChange={(v) => {
                        const updated = [...(company.coreValues || [])];
                        updated[idx] = { ...updated[idx], description: v };
                        setData({ ...data, about: { ...data.about, companyDetails: { ...company, coreValues: updated } } });
                      }}
                      placeholder="Uncompromised honesty and ethics..."
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = (company.coreValues || []).filter((_, i) => i !== idx);
                      setData({ ...data, about: { ...data.about, companyDetails: { ...company, coreValues: updated } } });
                    }}
                    className="mt-6 p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                    title="Remove Value"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => {
                  const updated = [...(company.coreValues || []), { title: "New Value", description: "Value description..." }];
                  setData({ ...data, about: { ...data.about, companyDetails: { ...company, coreValues: updated } } });
                }}
                className="flex items-center gap-2 text-xs text-orange-400 font-semibold py-2"
              >
                <Plus className="w-4 h-4" /> Add Core Value
              </button>
            </div>
          </SectionCard>

          {/* Company Heritage & Story */}
          <SectionCard title="Company Story & Heritage" icon={Building2}>
            <div className="space-y-4">
              <InputField
                label="Full Company Story / Description"
                rows={5}
                value={company.story || ""}
                onChange={(v) =>
                  setData({
                    ...data,
                    about: {
                      ...data.about,
                      companyDetails: { ...data.about.companyDetails, story: v },
                    },
                  })
                }
                placeholder="Write detailed company overview and history..."
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Mission Statement"
                  rows={3}
                  value={company.mission || ""}
                  onChange={(v) =>
                    setData({
                      ...data,
                      about: {
                        ...data.about,
                        companyDetails: { ...data.about.companyDetails, mission: v },
                      },
                    })
                  }
                  placeholder="Enter company mission..."
                />
                <InputField
                  label="Vision Statement"
                  rows={3}
                  value={company.vision || ""}
                  onChange={(v) =>
                    setData({
                      ...data,
                      about: {
                        ...data.about,
                        companyDetails: { ...data.about.companyDetails, vision: v },
                      },
                    })
                  }
                  placeholder="Enter company vision..."
                />
              </div>
            </div>
          </SectionCard>

          {/* Legal Credentials & Registration */}
          <SectionCard title="Statutory Credentials & Corporate Registration" icon={ShieldCheck}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <InputField
                label="Corporate CIN"
                value={company.cinNumber || ""}
                onChange={(v) =>
                  setData({
                    ...data,
                    about: {
                      ...data.about,
                      companyDetails: { ...data.about.companyDetails, cinNumber: v },
                    },
                  })
                }
                placeholder="U70109HR2014PTC053210"
              />
              <InputField
                label="HRERA Registration No"
                value={company.reraRegistration || ""}
                onChange={(v) =>
                  setData({
                    ...data,
                    about: {
                      ...data.about,
                      companyDetails: { ...data.about.companyDetails, reraRegistration: v },
                    },
                  })
                }
                placeholder="HRERA-PKL-GGM-1234-2024"
              />
              <InputField
                label="Headquarters Address"
                value={company.headquarters || ""}
                onChange={(v) =>
                  setData({
                    ...data,
                    about: {
                      ...data.about,
                      companyDetails: { ...data.about.companyDetails, headquarters: v },
                    },
                  })
                }
                placeholder="Sector 85, Gurugram, Haryana"
              />
              <InputField
                label="Established Year"
                type="number"
                value={company.establishedYear || 2008}
                onChange={(v) =>
                  setData({
                    ...data,
                    about: {
                      ...data.about,
                      companyDetails: { ...data.about.companyDetails, establishedYear: parseInt(v) || 2008 },
                    },
                  })
                }
              />
            </div>
          </SectionCard>

          {/* Corporate Headquarters & Office Contact Details */}
          <SectionCard title="Corporate Headquarters & Office Contact Details" icon={MapPin}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <InputField
                label="Headquarters Office Address"
                value={company.headquarters || ""}
                onChange={(v) =>
                  setData({
                    ...data,
                    about: {
                      ...data.about,
                      companyDetails: { ...data.about.companyDetails, headquarters: v },
                    },
                  })
                }
                placeholder="Sector 85, Gurugram, Haryana 122004"
              />
              <InputField
                label="Working Hours"
                value={company.workingHours || ""}
                onChange={(v) =>
                  setData({
                    ...data,
                    about: {
                      ...data.about,
                      companyDetails: { ...data.about.companyDetails, workingHours: v },
                    },
                  })
                }
                placeholder="Mon - Sat: 9:00 AM - 7:30 PM"
              />
              <InputField
                label="Direct Office Call"
                value={company.phone || ""}
                onChange={(v) =>
                  setData({
                    ...data,
                    about: {
                      ...data.about,
                      companyDetails: { ...data.about.companyDetails, phone: v },
                    },
                  })
                }
                placeholder="+91 77430 00070"
              />
              <InputField
                label="Official Office Email"
                value={company.email || ""}
                onChange={(v) =>
                  setData({
                    ...data,
                    about: {
                      ...data.about,
                      companyDetails: { ...data.about.companyDetails, email: v },
                    },
                  })
                }
                placeholder="info@dsgroupofcompanies.com"
              />
            </div>
          </SectionCard>

          {/* Office & Company Photos Gallery (Multi-photo Showroom) */}
          <SectionCard title="Office & Company Photos Gallery (Multi-Photo Showroom)" icon={ImageIcon}>
            <div className="space-y-4">
              <p className="text-xs text-slate-300">
                Upload and manage multiple high-resolution photos of your corporate headquarters, executive boardroom, client lounges, and architectural reception. These photos are dynamically displayed in the office photo gallery on <strong>/about/company</strong>.
              </p>

              {/* Upload or Add Image URL Controls */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setCropTarget({ type: "officePhoto" });
                    setCropModalOpen(true);
                  }}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-orange-400 hover:bg-amber-300 transition-colors flex items-center justify-center gap-2 shrink-0 shadow-md"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload & Crop Office Photo</span>
                </button>

                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    placeholder="Or paste office photo image URL (https://...)"
                    value={newOfficeImageUrl}
                    onChange={(e) => setNewOfficeImageUrl(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addOfficeImageUrl(); } }}
                    className="flex-1 px-4 py-2.5 rounded-xl text-xs bg-[#111827] border border-slate-800 text-white placeholder-slate-500 outline-none focus:border-orange-400"
                  />
                  <button
                    type="button"
                    onClick={addOfficeImageUrl}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 transition-colors shrink-0"
                  >
                    + Add URL
                  </button>
                </div>
              </div>

              {/* Gallery Grid of Uploaded Office Photos */}
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Current Office Photos ({(company.images || []).length}):
                </div>
                {(company.images || []).length === 0 ? (
                  <div className="p-6 rounded-2xl bg-[#111827]/60 border border-slate-800 text-center text-xs text-slate-500">
                    No custom office photos added yet. Default office images will be displayed on /about/company until you add custom photos.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(company.images || []).map((imgUrl, idx) => (
                      <div
                        key={idx}
                        className="relative rounded-2xl overflow-hidden border border-slate-800 bg-[#111827] group shadow-lg aspect-[16/10]"
                      >
                        <img
                          src={imgUrl}
                          alt={`Office photo ${idx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 text-orange-300 text-[10px] font-bold border border-white/10">
                          Photo #{idx + 1}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeOfficeImage(idx)}
                          className="absolute top-2 right-2 p-1.5 rounded-xl bg-red-600/90 text-white hover:bg-red-500 transition-colors shadow-lg"
                          title="Delete Photo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <div className="absolute bottom-2 left-2 right-2 truncate text-[11px] text-slate-300 font-mono">
                          {imgUrl}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </SectionCard>

          {/* ═══════════════════════════════════════════════════════════
              FOUNDER / LEADERSHIP MESSAGE (Section 3 on /about/company)
              ── Synced with Owner tab — edits here update Owner tab too
          ═══════════════════════════════════════════════════════════ */}
          <SectionCard title="👤 Founder / Leadership Message (About Company Page)" icon={UserCheck}>
            <div className="space-y-4">
              <p className="text-xs text-slate-300">
                This is the <strong>&quot;Message From the Founder&quot;</strong> section on the About Company page. Changes here sync with the Owner tab automatically.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Founder Photo Preview & Upload Controls */}
                <div className="space-y-3">
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Founder Photo</label>
                  <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-orange-400/40 bg-[#111827] shadow-xl mx-auto">
                    <img
                      src={owner.photo || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"}
                      alt="Founder Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-md cursor-pointer">
                      {directUploading === "owner" ? (
                        <><RefreshCw className="w-3.5 h-3.5 animate-spin" /><span>Uploading...</span></>
                      ) : (
                        <><Upload className="w-3.5 h-3.5" /><span>Upload Photo</span>
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleDirectUpload(f, "owner"); }} />
                        </>
                      )}
                    </label>
                    <button
                      type="button"
                      onClick={() => { setCropTarget({ type: "owner" }); setCropModalOpen(true); }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-colors cursor-pointer"
                    >
                      <span>✂️ Select &amp; Crop Photo</span>
                    </button>
                  </div>
                </div>

                {/* Founder Details Fields */}
                <div className="md:col-span-2 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField
                      label="Founder Name"
                      value={owner.name || ""}
                      onChange={(v) => setData({ ...data, about: { ...data.about, ownerDetails: { ...data.about.ownerDetails, name: v } } })}
                      placeholder="Surendra Soni"
                    />
                    <InputField
                      label="Designation / Title"
                      value={owner.designation || ""}
                      onChange={(v) => setData({ ...data, about: { ...data.about, ownerDetails: { ...data.about.ownerDetails, designation: v } } })}
                      placeholder="Founder & Managing Director"
                    />
                  </div>
                  <InputField
                    label="Founder Photo URL (Direct Link)"
                    value={owner.photo || ""}
                    onChange={(v) => setData({ ...data, about: { ...data.about, ownerDetails: { ...data.about.ownerDetails, photo: v } } })}
                    placeholder="https://your-image-url.com/photo.jpg"
                  />
                  <InputField
                    label="Founder Quote (Displayed in Leadership Section)"
                    rows={3}
                    value={owner.quote || ""}
                    onChange={(v) => setData({ ...data, about: { ...data.about, ownerDetails: { ...data.about.ownerDetails, quote: v } } })}
                    placeholder="Our vision has always been to create developments that combine architectural excellence..."
                  />
                  <InputField
                    label="Founder Bio (Short paragraph below the quote)"
                    rows={3}
                    value={owner.bio || ""}
                    onChange={(v) => setData({ ...data, about: { ...data.about, ownerDetails: { ...data.about.ownerDetails, bio: v } } })}
                    placeholder="With over 18+ years of visionary leadership in real estate development..."
                  />
                  <InputField
                    label="Experience Years Display"
                    value={owner.experienceYears || ""}
                    onChange={(v) => setData({ ...data, about: { ...data.about, ownerDetails: { ...data.about.ownerDetails, experienceYears: v } } })}
                    placeholder="18+ Years"
                  />
                </div>
              </div>
            </div>
          </SectionCard>

          {/* ═══════════════════════════════════════════════════════════
              CORPORATE STRENGTHS — 6 Metric Cards (Section 6 on /about/company)
          ═══════════════════════════════════════════════════════════ */}
          <SectionCard title="💪 Corporate Strengths (6 Metric Cards on /about/company)" icon={Award}>
            <div className="space-y-3">
              <p className="text-xs text-slate-400">
                These 6 strength cards are displayed in the &quot;Corporate Strengths&quot; section. Each card shows a bold value, label, and sub-text.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {(company.strengthCards || [
                  { label: "Years in Business", value: "16+", sub: "Since 2008" },
                  { label: "Projects Delivered", value: "25+", sub: "Across NCR" },
                  { label: "Construction Expertise", value: "EPC", sub: "End-to-End" },
                  { label: "Strategic Locations", value: "8+", sub: "Prime Sectors" },
                  { label: "Customer Satisfaction", value: "98%", sub: "Verified Feedback" },
                  { label: "Regulatory Certs", value: "100%", sub: "Compliance" },
                ]).map((card, idx) => {
                  const allCards = company.strengthCards || [
                    { label: "Years in Business", value: "16+", sub: "Since 2008" },
                    { label: "Projects Delivered", value: "25+", sub: "Across NCR" },
                    { label: "Construction Expertise", value: "EPC", sub: "End-to-End" },
                    { label: "Strategic Locations", value: "8+", sub: "Prime Sectors" },
                    { label: "Customer Satisfaction", value: "98%", sub: "Verified Feedback" },
                    { label: "Regulatory Certs", value: "100%", sub: "Compliance" },
                  ];
                  return (
                    <div key={idx} className="p-3.5 rounded-xl bg-[#111827] border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-orange-400 uppercase tracking-wider">Card #{idx + 1}</span>
                        {allCards.length > 1 && (
                          <button type="button" onClick={() => {
                            const updated = allCards.filter((_, i) => i !== idx);
                            setData({ ...data, about: { ...data.about, companyDetails: { ...company, strengthCards: updated } } });
                          }} className="p-1 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20"><Trash2 className="w-3 h-3" /></button>
                        )}
                      </div>
                      <InputField label="Display Value" value={card.value || ""} onChange={(v) => {
                        const updated = [...allCards]; updated[idx] = { ...updated[idx], value: v };
                        setData({ ...data, about: { ...data.about, companyDetails: { ...company, strengthCards: updated } } });
                      }} placeholder="e.g. 16+ or EPC" />
                      <InputField label="Label" value={card.label || ""} onChange={(v) => {
                        const updated = [...allCards]; updated[idx] = { ...updated[idx], label: v };
                        setData({ ...data, about: { ...data.about, companyDetails: { ...company, strengthCards: updated } } });
                      }} placeholder="Years in Business" />
                      <InputField label="Sub Text" value={card.sub || ""} onChange={(v) => {
                        const updated = [...allCards]; updated[idx] = { ...updated[idx], sub: v };
                        setData({ ...data, about: { ...data.about, companyDetails: { ...company, strengthCards: updated } } });
                      }} placeholder="Since 2008" />
                    </div>
                  );
                })}
              </div>
              <button type="button" onClick={() => {
                const current = company.strengthCards || [
                  { label: "Years in Business", value: "16+", sub: "Since 2008" },
                  { label: "Projects Delivered", value: "25+", sub: "Across NCR" },
                  { label: "Construction Expertise", value: "EPC", sub: "End-to-End" },
                  { label: "Strategic Locations", value: "8+", sub: "Prime Sectors" },
                  { label: "Customer Satisfaction", value: "98%", sub: "Verified Feedback" },
                  { label: "Regulatory Certs", value: "100%", sub: "Compliance" },
                ];
                setData({ ...data, about: { ...data.about, companyDetails: { ...company, strengthCards: [...current, { label: "New Metric", value: "0+", sub: "Description" }] } } });
              }} className="flex items-center gap-2 text-xs text-orange-400 font-semibold py-2">
                <Plus className="w-4 h-4" /> Add Strength Card
              </button>
            </div>
          </SectionCard>

          {/* ═══════════════════════════════════════════════════════════
              TRUST BANNER POINTS (Section 10 on /about/company)
          ═══════════════════════════════════════════════════════════ */}
          <SectionCard title="🏆 Trust Banner Points (Dark Banner Section)" icon={Globe}>
            <div className="space-y-3">
              <p className="text-xs text-slate-400">
                These trust points appear in the dark &quot;Trusted Real Estate Development Partner&quot; banner near the bottom of the About Company page.
              </p>
              <div className="space-y-2">
                {(company.trustPoints || ["Compliance Driven", "Customer Focused", "Prime Locations", "End-to-End Solutions", "Transparent Operations"]).map((point, idx) => {
                  const allPoints = company.trustPoints || ["Compliance Driven", "Customer Focused", "Prime Locations", "End-to-End Solutions", "Transparent Operations"];
                  return (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={point}
                        onChange={(e) => {
                          const updated = [...allPoints]; updated[idx] = e.target.value;
                          setData({ ...data, about: { ...data.about, companyDetails: { ...company, trustPoints: updated } } });
                        }}
                        placeholder="Trust point text..."
                        className="flex-1 px-4 py-2 rounded-xl text-sm text-white outline-none"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
                      />
                      <button type="button" onClick={() => {
                        const updated = allPoints.filter((_, i) => i !== idx);
                        setData({ ...data, about: { ...data.about, companyDetails: { ...company, trustPoints: updated } } });
                      }} className="p-2 rounded-lg bg-red-500/10 text-red-400 shrink-0"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  );
                })}
              </div>
              <button type="button" onClick={() => {
                const current = company.trustPoints || ["Compliance Driven", "Customer Focused", "Prime Locations", "End-to-End Solutions", "Transparent Operations"];
                setData({ ...data, about: { ...data.about, companyDetails: { ...company, trustPoints: [...current, "New Trust Point"] } } });
              }} className="flex items-center gap-2 text-xs text-orange-400 font-semibold py-2">
                <Plus className="w-4 h-4" /> Add Trust Point
              </button>
            </div>
          </SectionCard>

        </div>
      )}

      {/* ════════════════════════════════════════════════════════════
          SUB-TAB 2: OWNER / FOUNDER DETAILS
      ════════════════════════════════════════════════════════════ */}
      {aboutSubTab === "owner" && (
        <div className="space-y-6">

          {/* Owner Page Hero Headline & Subtitle */}
          <SectionCard title="Owner Page Hero & Main Headline (/about/owner)" icon={Sparkles}>
            <div className="space-y-4">
              <InputField
                label="Main Hero Headline (H1)"
                value={owner.heroHeading || ""}
                onChange={(v) =>
                  setData({
                    ...data,
                    about: {
                      ...data.about,
                      ownerDetails: { ...data.about.ownerDetails, heroHeading: v },
                    },
                  })
                }
                placeholder="Architect of Legacies, Pioneer of Trust"
              />
              <InputField
                label="Hero Subtitle / Description"
                rows={2}
                value={owner.heroSubtitle || ""}
                onChange={(v) =>
                  setData({
                    ...data,
                    about: {
                      ...data.about,
                      ownerDetails: { ...data.about.ownerDetails, heroSubtitle: v },
                    },
                  })
                }
                placeholder="Meet Surendra Soni — visionary founder and managing director..."
              />
            </div>
          </SectionCard>

          {/* Founder Executive Profile */}
          <SectionCard title="Founder Profile & Photo" icon={UserCheck}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Photo Box with Cropper button */}
              <div className="space-y-3">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Founder Photo
                </label>
                <div className="relative w-44 h-56 rounded-2xl overflow-hidden border-2 border-orange-400/40 bg-[#111827] shadow-xl">
                  <img
                    src={owner.photo || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"}
                    alt="Owner Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <label className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-md cursor-pointer">
                    {directUploading === "owner" ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Uploading Photo...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Direct from Computer</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) handleDirectUpload(f, "owner");
                          }}
                        />
                      </>
                    )}
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setCropTarget({ type: "owner" });
                      setCropModalOpen(true);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-colors shadow-xs cursor-pointer"
                  >
                    <span>✂️ Select &amp; Crop Photo</span>
                  </button>
                  <InputField
                    label="Or Direct Image URL"
                    value={owner.photo || ""}
                    onChange={(v) =>
                      setData({
                        ...data,
                        about: {
                          ...data.about,
                          ownerDetails: { ...data.about.ownerDetails, photo: v },
                        },
                      })
                    }
                  />
                </div>
              </div>

              {/* Bio & Details */}
              <div className="md:col-span-2 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField
                    label="Founder Full Name"
                    value={owner.name || ""}
                    onChange={(v) =>
                      setData({
                        ...data,
                        about: {
                          ...data.about,
                          ownerDetails: { ...data.about.ownerDetails, name: v },
                        },
                      })
                    }
                  />
                  <InputField
                    label="Official Designation"
                    value={owner.designation || ""}
                    onChange={(v) =>
                      setData({
                        ...data,
                        about: {
                          ...data.about,
                          ownerDetails: { ...data.about.ownerDetails, designation: v },
                        },
                      })
                    }
                  />
                  <InputField
                    label="Experience Display"
                    value={owner.experienceYears || ""}
                    onChange={(v) =>
                      setData({
                        ...data,
                        about: {
                          ...data.about,
                          ownerDetails: { ...data.about.ownerDetails, experienceYears: v },
                        },
                      })
                    }
                    placeholder="18+ Years"
                  />
                  <InputField
                    label="WhatsApp Number (for direct client leads)"
                    value={owner.whatsapp || ""}
                    onChange={(v) =>
                      setData({
                        ...data,
                        about: {
                          ...data.about,
                          ownerDetails: { ...data.about.ownerDetails, whatsapp: v },
                        },
                      })
                    }
                    placeholder="+91 77430 00070"
                  />
                </div>

                <InputField
                  label="Founder Vision Statement / Quote"
                  rows={2}
                  value={owner.quote || ""}
                  onChange={(v) =>
                    setData({
                      ...data,
                      about: {
                        ...data.about,
                        ownerDetails: { ...data.about.ownerDetails, quote: v },
                      },
                    })
                  }
                  placeholder="Enter quote..."
                />

                <InputField
                  label="Executive Biography"
                  rows={4}
                  value={owner.bio || ""}
                  onChange={(v) =>
                    setData({
                      ...data,
                      about: {
                        ...data.about,
                        ownerDetails: { ...data.about.ownerDetails, bio: v },
                      },
                    })
                  }
                  placeholder="Detailed professional bio..."
                />
              </div>

            </div>
          </SectionCard>

          {/* Honors & Recognitions */}
          <SectionCard title="Honors, Recognitions & Affiliations" icon={Award}>
            <div className="space-y-3">
              {(owner.achievements || []).map((ach, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#111827]/80 border border-slate-800 flex items-start gap-4">
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <InputField
                      label="Honor Title"
                      value={ach.title || ""}
                      onChange={(v) => {
                        const achs = [...owner.achievements];
                        achs[idx] = { ...achs[idx], title: v };
                        setData({ ...data, about: { ...data.about, ownerDetails: { ...owner, achievements: achs } } });
                      }}
                    />
                    <InputField
                      label="Year"
                      value={ach.year || ""}
                      onChange={(v) => {
                        const achs = [...owner.achievements];
                        achs[idx] = { ...achs[idx], year: v };
                        setData({ ...data, about: { ...data.about, ownerDetails: { ...owner, achievements: achs } } });
                      }}
                      placeholder="2024"
                    />
                    <InputField
                      label="Description"
                      value={ach.description || ""}
                      onChange={(v) => {
                        const achs = [...owner.achievements];
                        achs[idx] = { ...achs[idx], description: v };
                        setData({ ...data, about: { ...data.about, ownerDetails: { ...owner, achievements: achs } } });
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const achs = owner.achievements.filter((_, i) => i !== idx);
                      setData({ ...data, about: { ...data.about, ownerDetails: { ...owner, achievements: achs } } });
                    }}
                    className="mt-6 p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => {
                  const achs = [...(owner.achievements || []), { title: "", year: "2026", description: "" }];
                  setData({ ...data, about: { ...data.about, ownerDetails: { ...owner, achievements: achs } } });
                }}
                className="flex items-center gap-2 text-xs text-orange-400 font-semibold py-2"
              >
                <Plus className="w-4 h-4" /> Add Honor / Award
              </button>
            </div>
          </SectionCard>

        </div>
      )}

      {/* ════════════════════════════════════════════════════════════
          SUB-TAB 3: EMPLOYEE DIRECTORY (TEAM MEMBERS)
      ════════════════════════════════════════════════════════════ */}
      {aboutSubTab === "employees" && (
        <div className="space-y-6">

          {/* Employee Edit / Add Modal */}
          {editingEmp && (
            <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
              <div
                className="w-full max-w-2xl rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl relative my-8"
                style={{ background: "#091426", border: "1px solid rgba(255,121,0,0.3)" }}
              >
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <h3 className="text-base font-bold text-white">
                    {isAddingEmp ? "Add New Employee / Specialist" : "Edit Employee Details"}
                  </h3>
                  <button
                    onClick={() => { setEditingEmp(null); setIsAddingEmp(false); }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField
                    label="Full Name"
                    value={editingEmp.name || ""}
                    onChange={(v) => setEditingEmp({ ...editingEmp, name: v })}
                    placeholder="e.g. Priya Sharma"
                    required
                  />
                  <InputField
                    label="Designation / Post"
                    value={editingEmp.designation || ""}
                    onChange={(v) => setEditingEmp({ ...editingEmp, designation: v })}
                    placeholder="Head of Sales & Client Relations"
                  />
                  <SelectField
                    label="Department"
                    value={editingEmp.department || "Residential"}
                    onChange={(v) => setEditingEmp({ ...editingEmp, department: v })}
                    options={[
                      { label: "Leadership", value: "Leadership" },
                      { label: "Residential", value: "Residential" },
                      { label: "Commercial", value: "Commercial" },
                      { label: "Architecture & Construction", value: "Architecture & Construction" },
                      { label: "Legal & Liaison", value: "Legal & Liaison" },
                      { label: "Marketing", value: "Marketing" },
                      { label: "Operations", value: "Operations" },
                    ]}
                  />
                  <InputField
                    label="Experience"
                    value={editingEmp.experience || ""}
                    onChange={(v) => setEditingEmp({ ...editingEmp, experience: v })}
                    placeholder="10+ Years"
                  />
                  <InputField
                    label="Phone Number"
                    value={editingEmp.phone || ""}
                    onChange={(v) => setEditingEmp({ ...editingEmp, phone: v })}
                    placeholder="+91 98123 45678"
                  />
                  <InputField
                    label="Email Address"
                    value={editingEmp.email || ""}
                    onChange={(v) => setEditingEmp({ ...editingEmp, email: v })}
                    placeholder="name@dsgroupofcompanies.com"
                  />
                  <div className="sm:col-span-2">
                    <InputField
                      label="LinkedIn Profile URL"
                      value={editingEmp.linkedin || ""}
                      onChange={(v) => setEditingEmp({ ...editingEmp, linkedin: v })}
                      placeholder="https://linkedin.com/in/..."
                    />
                  </div>
                </div>

                {/* Photo upload & Crop for employee */}
                <div className="p-4 rounded-xl bg-[#111827] border border-slate-800 space-y-3">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-800 border border-white/10 shrink-0">
                      <img
                        src={editingEmp.photo || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"}
                        alt="Emp Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="text-xs font-bold text-white">Employee Photo</div>
                      <p className="text-[11px] text-slate-400">Upload directly from computer or crop</p>
                      <div className="flex flex-wrap gap-2 pt-1">
                        <label className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow cursor-pointer inline-flex items-center gap-1.5">
                          {directUploading === "editingEmp" ? (
                            <>
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                              <span>Uploading...</span>
                            </>
                          ) : (
                            <>
                              <Upload className="w-3.5 h-3.5" />
                              <span>Upload from Computer</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const f = e.target.files?.[0];
                                  if (f) handleDirectUpload(f, "editingEmp");
                                }}
                              />
                            </>
                          )}
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            setCropTarget({ type: "editingEmp" });
                            setCropModalOpen(true);
                          }}
                          className="px-3 py-2 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-colors shadow-xs cursor-pointer"
                        >
                          <span>✂️ Crop &amp; Zoom</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <InputField
                    label="Or Direct Image URL"
                    value={editingEmp.photo || ""}
                    onChange={(v) => setEditingEmp({ ...editingEmp, photo: v })}
                  />
                </div>

                <InputField
                  label="Work Description & Bio"
                  rows={3}
                  value={editingEmp.bio || ""}
                  onChange={(v) => setEditingEmp({ ...editingEmp, bio: v })}
                  placeholder="Describe employee responsibilities, key projects, and portfolio focus..."
                />

                <InputField
                  label="Skills / Specialties (comma-separated)"
                  value={Array.isArray(editingEmp.skills) ? editingEmp.skills.join(", ") : (editingEmp.skills || "")}
                  onChange={(v) => setEditingEmp({ ...editingEmp, skills: v.split(",").map((s) => s.trim()).filter(Boolean) })}
                  placeholder="Luxury Portfolios, CRM Strategy, Valuation"
                />

                <InputField
                  label="Key Projects Handled (comma-separated)"
                  value={Array.isArray(editingEmp.projects) ? editingEmp.projects.join(", ") : (editingEmp.projects || "")}
                  onChange={(v) => setEditingEmp({ ...editingEmp, projects: v.split(",").map((s) => s.trim()).filter(Boolean) })}
                  placeholder="DS Imperial Heights Sector 85, Dwarka Expressway Commercial Plaza"
                />

                <InputField
                  label="Certifications & Accreditations (comma-separated)"
                  value={Array.isArray(editingEmp.certifications) ? editingEmp.certifications.join(", ") : (editingEmp.certifications || "")}
                  onChange={(v) => setEditingEmp({ ...editingEmp, certifications: v.split(",").map((s) => s.trim()).filter(Boolean) })}
                  placeholder="HRERA Certified Professional, Council of Architecture"
                />

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                  <button
                    onClick={() => { setEditingEmp(null); setIsAddingEmp(false); }}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveEmployee}
                    className="px-6 py-2.5 rounded-xl text-xs font-bold text-slate-950 uppercase tracking-wider"
                    style={{ background: "linear-gradient(135deg, #FF7900, #F16E00)" }}
                  >
                    Apply Employee Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Top Bar: Add Employee */}
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">
              Team Directory ({employees.length} Members)
            </h3>
            <button
              onClick={() => {
                setEditingEmp({
                  id: `emp-${Date.now()}`,
                  name: "",
                  designation: "",
                  department: "Residential",
                  photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
                  bio: "",
                  experience: "5+ Years",
                  skills: [],
                  priority: employees.length + 1,
                });
                setIsAddingEmp(true);
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 uppercase tracking-wider transition-all"
              style={{ background: "linear-gradient(135deg, #FF7900, #F16E00)", boxShadow: "0 4px 15px rgba(255,121,0,0.2)" }}
            >
              <Plus className="w-4 h-4" /> Add New Employee
            </button>
          </div>

          {/* Employee Cards List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {employees.map((emp, idx) => (
              <div
                key={emp.id || idx}
                className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800/80 flex items-start gap-4 hover:border-orange-400/30 transition-all shadow-lg"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-800 border border-white/10 shrink-0">
                  <img
                    src={emp.photo || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"}
                    alt={emp.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-bold text-white truncate">{emp.name}</h4>
                      <p className="text-xs font-semibold text-slate-400 truncate">{emp.designation}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-orange-500/15 text-orange-300 border border-orange-500/30 shrink-0">
                      {emp.department}
                    </span>
                  </div>

                  {emp.bio && (
                    <p className="text-[11px] text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                      {emp.bio}
                    </p>
                  )}

                  <div className="flex items-center gap-3 mt-3 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                    {emp.phone && <span className="truncate">📞 {emp.phone}</span>}
                    <div className="ml-auto flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => {
                          setEditingEmp({ ...emp });
                          setIsAddingEmp(false);
                        }}
                        className="p-1.5 rounded-lg text-blue-400 hover:bg-blue-500/10"
                        title="Edit Employee"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteEmployee(emp.id)}
                        className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10"
                        title="Delete Employee"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {employees.length === 0 && (
            <div className="text-center py-12 rounded-2xl bg-slate-900/50 border border-slate-800 text-slate-500 text-xs">
              No employees added yet. Click &quot;Add New Employee&quot; above to create team profiles.
            </div>
          )}

        </div>
      )}

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
          style={{ background: "linear-gradient(135deg, #FF7900, #F16E00)" }}>
          <Plus className="w-4 h-4" /> Add Service
        </button>
      </div>
      {loading ? <div className="text-slate-400 text-sm py-8 text-center"><RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-orange-400" />Loading...</div> : (
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
            <a href={`/valuable-properties/${editingProp.slug}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-orange-400 bg-orange-400/10 border border-orange-400/20 hover:bg-orange-400/20 transition-all">
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
                  <button onClick={() => setEditingProp({ ...editingProp, gallery: [...(editingProp.gallery || []), ""] })} className="flex items-center gap-2 text-xs text-orange-400 font-semibold py-1">
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
                  <button onClick={() => setEditingProp({ ...editingProp, amenities: [...(editingProp.amenities || []), ""] })} className="flex items-center gap-2 text-xs text-orange-400 font-semibold py-1">
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
                  <button onClick={() => setEditingProp({ ...editingProp, features: [...(editingProp.features || []), ""] })} className="flex items-center gap-2 text-xs text-orange-400 font-semibold py-1">
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
            <Sparkles className="w-6 h-6 text-orange-400" />
            <h2 className="text-2xl font-bold text-white">Valuable Properties</h2>
          </div>
          <p className="text-sm text-slate-400 mt-1">Independent module for Hero Section Featured Popups & High-Value Listings ({properties.length} items)</p>
        </div>
        <button onClick={startAdd} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white"
          style={{ background: "linear-gradient(135deg, #FF7900, #F16E00)", boxShadow: "0 4px 15px rgba(255,121,0,0.2)" }}>
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
              style={{ background: filterPublish === st ? "linear-gradient(135deg, #FF7900, #F16E00)" : "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              {st}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-slate-400 text-sm py-12 text-center"><RefreshCw className="w-6 h-6 animate-spin mx-auto mb-3 text-orange-400" />Loading Valuable Properties...</div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filtered.map((prop) => (
            <div key={prop._id} className="flex items-center gap-4 p-4 rounded-2xl transition-all hover:border-orange-400/30"
              style={{ background: "rgba(10,22,40,0.7)", border: "1px solid rgba(255,121,0,0.15)" }}>
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
                <a href={`/valuable-properties/${prop.slug}`} target="_blank" rel="noreferrer" className="p-2 rounded-lg text-orange-400 hover:bg-orange-500/10 transition-colors" title="Preview Page">
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
          <div key={label} className="p-5 rounded-2xl" style={{ background: "rgba(10,22,40,0.7)", border: "1px solid rgba(255,121,0,0.15)" }}>
            <div className="flex items-center gap-3 mb-2">
              <Icon className="w-5 h-5 text-orange-400" />
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
          style={{ background: seeding ? "rgba(255,121,0,0.5)" : "linear-gradient(135deg, #1e40af, #3b82f6)", boxShadow: "0 4px 15px rgba(30,64,175,0.3)" }}>
          {seeding ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
          {seeding ? "Seeding..." : "Seed Static Data to MongoDB"}
        </button>
      </SectionCard>

      <SectionCard title="Quick Navigation" icon={LayoutDashboard}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {NAV_ITEMS.filter((n) => n.id !== "overview").map(({ id, label, icon: Icon }) => (
            <div key={id} className="p-4 rounded-xl cursor-pointer hover:border-orange-400/30 transition-all"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <Icon className="w-5 h-5 text-orange-400 mb-2" />
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
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30">
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
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-orange-400" : ""}`} />
          <span>Refresh Leads</span>
        </button>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="text-2xl font-black text-white">{totalCount}</div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">Total Leads</div>
        </div>
        <div className="p-4 rounded-2xl bg-orange-500/10 border border-orange-500/30">
          <div className="text-2xl font-black text-orange-400">{newCount}</div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-orange-400/80 mt-0.5">🔥 New Leads</div>
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
            className="w-full px-4 py-2.5 rounded-xl text-xs bg-[#111827] border border-slate-800 text-white placeholder-slate-500 outline-none focus:border-orange-400"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {["All", "New", "Contacted", "In Progress", "Closed"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                statusFilter === st
                  ? "bg-orange-500 text-slate-950 font-black"
                  : "bg-[#111827] text-slate-400 border border-slate-800 hover:text-white"
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
          <RefreshCw className="w-8 h-8 animate-spin text-orange-400 mx-auto" />
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
                className="rounded-2xl p-5 bg-slate-900/90 border border-slate-800/80 hover:border-orange-500/30 transition-all space-y-4 shadow-lg"
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
                          : "bg-orange-500/20 text-orange-400 border-orange-500/40"
                      }`}
                    >
                      <option value="New" className="bg-slate-900 text-orange-400">🔥 New Lead</option>
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
                  <div className="p-3 rounded-xl bg-[#111827] border border-slate-800">
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

                  <div className="p-3 rounded-xl bg-[#111827] border border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Email Address</span>
                    <span className="font-semibold text-blue-400 truncate block">
                      {lead.email || "Not Provided"}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#111827] border border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Category Interest</span>
                    <span className="font-bold text-orange-400">{lead.category}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/30">
                    <span className="text-[10px] uppercase font-bold text-orange-400/80 block mb-1">Budget Range</span>
                    <span className="font-extrabold text-orange-400">{lead.budget}</span>
                  </div>
                </div>

                {/* Message / Requirements */}
                {lead.message && (
                  <div className="p-3 rounded-xl bg-[#111827]/70 border border-slate-800/80 text-xs">
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
            <BookOpen className="w-5 h-5 text-orange-400" />
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
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-orange-400 hover:bg-amber-300 transition-all shadow-lg"
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
                This post will appear live on <span className="text-orange-400">/blog</span> and <span className="text-orange-400">/blog/{editingBlog.slug || "[slug]"}</span>
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
                <label className="text-xs font-bold uppercase tracking-wider text-orange-400">
                  Article Content Sections (Headings &amp; Paragraphs)
                </label>
                <button
                  type="button"
                  onClick={addContentSection}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5 text-orange-400" />
                  <span>Add Section</span>
                </button>
              </div>

              <div className="space-y-4">
                {(editingBlog.content || []).map((sec, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-800/80 bg-[#111827]/60 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold text-orange-400 uppercase">Section {idx + 1}</span>
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
          <RefreshCw className="w-4 h-4 animate-spin text-orange-400" />
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
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-400/10 text-orange-400 border border-orange-400/20">
                    {blog.category}
                  </span>
                  <span className="text-[10px] text-slate-500">{blog.publishedDate || "Recently Published"}</span>
                </div>

                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors line-clamp-2 mb-2 font-outfit">
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
                  className="text-[11px] font-semibold text-slate-400 hover:text-orange-400 transition-colors flex items-center gap-1"
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
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-orange-400/20 hover:text-orange-400 text-slate-300 transition-colors"
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

// ─── INVENTORIES PANEL (FULL PROPERTY INVENTORIES CRUD) ──────────────────────

function InventoriesPanel({ showToast }) {
  const [inventories, setInventories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCat, setFilterCat] = useState("All");
  const [filterSaleType, setFilterSaleType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const [isCreating, setIsCreating] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [customAmenity, setCustomAmenity] = useState("");
  const [customHighlight, setCustomHighlight] = useState("");

  const fetchInventories = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/inventories");
      const d = await res.json();
      if (d.success) {
        setInventories(d.data || d.inventories || []);
      }
    } catch (err) {
      showToast("Error loading inventories: " + err.message, "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchInventories();
  }, [fetchInventories]);

  const startCreate = () => {
    setEditingItem({
      title: "",
      slug: "",
      category: "Residential",
      saleType: "Sale",
      propertyType: "Apartment",
      location: "",
      sector: "Sector 85",
      city: "Gurugram",
      state: "Haryana",
      price: "",
      pricePerSqft: "",
      negotiable: false,
      area: "",
      bedrooms: "3 BHK",
      bathrooms: "3",
      facing: "East",
      floor: "7th",
      totalFloors: "24",
      parking: "1 Reserved",
      furnishing: "Semi-Furnished",
      status: "Available",
      possession: "Ready to Move",
      thumbnail: "",
      images: [],
      shortDesc: "",
      fullDesc: "",
      amenities: ["24x7 Security", "Power Backup", "Clubhouse", "Reserved Parking"],
      highlights: ["Prime Location near Dwarka Expressway", "100% HRERA Compliant & Clear Title"],
      reraNumber: "HRERA-PKL-GGM-1234-2024",
      contactPhone: "+91 77430 00070",
      whatsappNumber: "917743000070",
      featured: false,
      priority: 0,
      publishStatus: "Published",
      seoTitle: "",
      seoDescription: "",
      seoKeywords: "",
    });
    setIsCreating(true);
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    if (!editingItem.title?.trim()) {
      showToast("Please enter property title", "error");
      return;
    }

    setSaving(true);
    try {
      const method = isCreating ? "POST" : "PUT";
      const res = await fetch("/api/admin/inventories", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem),
      });
      const d = await res.json();
      if (d.success) {
        showToast(isCreating ? "Inventory item created successfully!" : "Inventory updated successfully!", "success");
        setEditingItem(null);
        setIsCreating(false);
        fetchInventories();
      } else {
        showToast(d.message || "Failed to save inventory", "error");
      }
    } catch (err) {
      showToast("Error saving inventory: " + err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      const res = await fetch(`/api/admin/inventories?id=${id}`, { method: "DELETE" });
      const d = await res.json();
      if (d.success) {
        showToast("Inventory item deleted", "success");
        fetchInventories();
      } else {
        showToast(d.message || "Failed to delete", "error");
      }
    } catch (err) {
      showToast("Error deleting: " + err.message, "error");
    }
  };

  const handleTogglePublish = async (item) => {
    const newStatus = item.publishStatus === "Published" ? "Draft" : "Published";
    try {
      const res = await fetch("/api/admin/inventories", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: item._id, publishStatus: newStatus }),
      });
      const d = await res.json();
      if (d.success) {
        showToast(`Status changed to ${newStatus}`, "success");
        fetchInventories();
      }
    } catch (err) {
      showToast("Error updating status: " + err.message, "error");
    }
  };

  const handleDirectImageUpload = async (file) => {
    if (!file) return;
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const d = await res.json();
      if (d.success && d.url) {
        const currentImages = editingItem.images || [];
        const newImages = [...currentImages, d.url];
        setEditingItem({
          ...editingItem,
          images: newImages,
          thumbnail: editingItem.thumbnail || d.url,
        });
        showToast("Image uploaded!", "success");
      } else {
        showToast(d.message || "Upload failed", "error");
      }
    } catch (err) {
      showToast("Upload error: " + err.message, "error");
    } finally {
      setUploadingImage(false);
    }
  };

  const addImageUrl = () => {
    if (!newImageUrl.trim()) return;
    const currentImages = editingItem.images || [];
    const newImages = [...currentImages, newImageUrl.trim()];
    setEditingItem({
      ...editingItem,
      images: newImages,
      thumbnail: editingItem.thumbnail || newImageUrl.trim(),
    });
    setNewImageUrl("");
  };

  const removeImage = (idx) => {
    const currentImages = [...(editingItem.images || [])];
    const removed = currentImages.splice(idx, 1)[0];
    const updatedThumbnail = editingItem.thumbnail === removed ? (currentImages[0] || "") : editingItem.thumbnail;
    setEditingItem({
      ...editingItem,
      images: currentImages,
      thumbnail: updatedThumbnail,
    });
  };

  const commonAmenities = [
    "Swimming Pool", "Gymnasium", "Clubhouse", "24x7 Security", "Power Backup",
    "Children Play Area", "Reserved Parking", "High Speed Elevators", "EV Charging Station",
    "Landscaped Garden", "CCTV Surveillance", "Badminton Court", "Jogging Track"
  ];

  const filteredList = inventories.filter((item) => {
    const matchCat = filterCat === "All" || item.category === filterCat;
    const matchSaleType = filterSaleType === "All" || item.saleType === filterSaleType;
    const matchStatus = filterStatus === "All" || item.publishStatus === filterStatus;
    const matchSearch =
      !searchTerm.trim() ||
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sector?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.propertyType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.price?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchCat && matchSaleType && matchStatus && matchSearch;
  });

  return (
    <div>
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Building2 className="w-6 h-6 text-orange-400" />
            <span>Property Inventories Manager</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Add &amp; manage Residential, Commercial, and Plot properties with multi-image gallery, specs, pricing &amp; SEO control.
          </p>
        </div>

        <button
          onClick={startCreate}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 transition-all shadow-lg"
          style={{ background: "linear-gradient(135deg, #FF7900, #F16E00)" }}
        >
          <Plus className="w-4 h-4" />
          <span>Add New Inventory</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-[#091426] border border-slate-800 mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-center">
          <input
            type="text"
            placeholder="Search inventories by title, sector, location, price..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 w-full px-4 py-2.5 bg-[#111827] border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 outline-none focus:border-orange-400"
          />

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
            {["All", "Residential", "Commercial", "Plots"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCat(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  filterCat === cat
                    ? "bg-[#FF7900] text-slate-950 shadow-xs"
                    : "bg-white/5 text-slate-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold uppercase text-slate-500">Sale Type:</span>
            {["All", "Sale", "Rent", "Lease"].map((st) => (
              <button
                key={st}
                onClick={() => setFilterSaleType(st)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                  filterSaleType === st
                    ? "bg-orange-500/20 text-orange-300 border border-orange-500/40"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase text-slate-500">Status:</span>
            {["All", "Published", "Draft"].map((ps) => (
              <button
                key={ps}
                onClick={() => setFilterStatus(ps)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                  filterStatus === ps
                    ? "bg-blue-500/20 text-blue-300 border border-blue-500/40"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {ps}
              </button>
            ))}
            <span className="ml-2 text-slate-500 font-mono text-[11px]">({filteredList.length} items)</span>
          </div>
        </div>
      </div>

      {/* List of Inventories */}
      {loading ? (
        <div className="text-center py-16 text-slate-400 text-sm">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-3 text-orange-400" />
          <span>Loading inventories from MongoDB...</span>
        </div>
      ) : filteredList.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-3xl bg-[#091426] border border-slate-800 text-slate-400 space-y-3">
          <Building2 className="w-12 h-12 text-slate-600 mx-auto" />
          <p className="text-sm font-bold text-slate-300">No Inventory Items Found</p>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Click &quot;Add New Inventory&quot; above to create your first property listing with complete images, pricing, and SEO details.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredList.map((item) => {
            const thumb = item.thumbnail || (item.images && item.images[0]) || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400&auto=format&fit=crop";
            return (
              <div
                key={item._id}
                className="p-5 rounded-2xl bg-[#091426] border border-slate-800 hover:border-orange-500/30 transition-all flex flex-col md:flex-row items-start md:items-center gap-5 shadow-lg"
              >
                {/* Thumbnail */}
                <div className="relative w-full md:w-36 h-28 rounded-xl overflow-hidden bg-slate-900 border border-slate-700/60 shrink-0">
                  <img src={thumb} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-black/70 text-orange-300">
                    {item.category}
                  </div>
                  {item.images?.length > 1 && (
                    <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold bg-black/70 text-white">
                      📷 {item.images.length}
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-bold text-white truncate">{item.title}</h3>
                    {item.featured && <Badge text="Featured" color="amber" />}
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      item.publishStatus === "Published" ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30" : "bg-slate-700 text-slate-300"
                    }`}>
                      {item.publishStatus}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-orange-500/10 text-orange-300">
                      For {item.saleType}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 truncate">
                    📍 {[item.sector, item.location, item.city].filter(Boolean).join(", ")} · {item.propertyType} {item.bedrooms ? `· ${item.bedrooms}` : ""} {item.area ? `· ${item.area}` : ""}
                  </p>

                  <div className="flex items-center gap-3 text-xs font-bold text-orange-400">
                    <span>{item.price || "Price on Request"}</span>
                    {item.pricePerSqft && <span className="text-slate-500 font-normal">({item.pricePerSqft})</span>}
                    {item.status && <span className="text-slate-400 font-normal">· {item.status}</span>}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  <a
                    href={`/inventories/${item.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                    title="View Public Page"
                  >
                    <Eye className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => handleTogglePublish(item)}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    title="Toggle Publish Status"
                  >
                    {item.publishStatus === "Published" ? "Unpublish" : "Publish"}
                  </button>

                  <button
                    onClick={() => {
                      setEditingItem({ ...item });
                      setIsCreating(false);
                    }}
                    className="p-2 rounded-xl bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 transition-colors"
                    title="Edit Inventory"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(item._id || item.id, item.title)}
                    className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                    title="Delete Inventory"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {editingItem && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-4xl rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 bg-[#091426] border border-orange-500/30 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 sticky top-0 bg-[#091426] z-10">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-orange-400" />
                  <span>{isCreating ? "Add New Property Inventory" : "Edit Property Inventory"}</span>
                </h3>
                <p className="text-xs text-slate-400">Complete all property specifications, image gallery, pricing, and SEO.</p>
              </div>
              <button
                onClick={() => {
                  setEditingItem(null);
                  setIsCreating(false);
                }}
                className="p-2 rounded-xl text-slate-400 hover:text-white bg-white/5 hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              {/* 1. Basic Info */}
              <SectionCard title="1. Basic Information & Categorization" icon={Building2}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField
                    label="Property Title *"
                    required
                    value={editingItem.title || ""}
                    onChange={(v) => {
                      const autoSlug = isCreating
                        ? v.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
                        : editingItem.slug;
                      setEditingItem({ ...editingItem, title: v, slug: autoSlug });
                    }}
                    placeholder="e.g. Ultra Luxury 3 BHK Apartment Sector 85"
                  />

                  <InputField
                    label="URL Slug (Auto-generated or custom) *"
                    required
                    value={editingItem.slug || ""}
                    onChange={(v) => setEditingItem({ ...editingItem, slug: v })}
                    placeholder="ultra-luxury-3bhk-sector-85"
                  />

                  <SelectField
                    label="Category *"
                    value={editingItem.category || "Residential"}
                    onChange={(v) => setEditingItem({ ...editingItem, category: v })}
                    options={[
                      { label: "Residential", value: "Residential" },
                      { label: "Commercial", value: "Commercial" },
                      { label: "Plots", value: "Plots" },
                    ]}
                  />

                  <SelectField
                    label="Sale Type *"
                    value={editingItem.saleType || "Sale"}
                    onChange={(v) => setEditingItem({ ...editingItem, saleType: v })}
                    options={[
                      { label: "Sale", value: "Sale" },
                      { label: "Rent", value: "Rent" },
                      { label: "Lease", value: "Lease" },
                    ]}
                  />

                  <SelectField
                    label="Property Sub-Type"
                    value={editingItem.propertyType || "Apartment"}
                    onChange={(v) => setEditingItem({ ...editingItem, propertyType: v })}
                    options={[
                      { label: "Apartment", value: "Apartment" },
                      { label: "Villa", value: "Villa" },
                      { label: "Independent House", value: "Independent House" },
                      { label: "Builder Floor", value: "Builder Floor" },
                      { label: "Office", value: "Office" },
                      { label: "Shop", value: "Shop" },
                      { label: "Showroom", value: "Showroom" },
                      { label: "Plot / Land", value: "Plot" },
                      { label: "Warehouse", value: "Warehouse" },
                    ]}
                  />

                  <SelectField
                    label="Availability Status"
                    value={editingItem.status || "Available"}
                    onChange={(v) => setEditingItem({ ...editingItem, status: v })}
                    options={[
                      { label: "Available", value: "Available" },
                      { label: "Under Construction", value: "Under Construction" },
                      { label: "Coming Soon", value: "Coming Soon" },
                      { label: "Negotiation", value: "Negotiation" },
                      { label: "Sold", value: "Sold" },
                    ]}
                  />
                </div>
              </SectionCard>

              {/* 2. Location & Pricing */}
              <SectionCard title="2. Location & Pricing Details" icon={MapPin}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <InputField
                    label="Sector / Locality"
                    value={editingItem.sector || ""}
                    onChange={(v) => setEditingItem({ ...editingItem, sector: v })}
                    placeholder="Sector 85"
                  />
                  <InputField
                    label="Full Location / Landmark"
                    value={editingItem.location || ""}
                    onChange={(v) => setEditingItem({ ...editingItem, location: v })}
                    placeholder="Dwarka Expressway Corridor"
                  />
                  <InputField
                    label="City"
                    value={editingItem.city || "Gurugram"}
                    onChange={(v) => setEditingItem({ ...editingItem, city: v })}
                    placeholder="Gurugram"
                  />
                  <InputField
                    label="State"
                    value={editingItem.state || "Haryana"}
                    onChange={(v) => setEditingItem({ ...editingItem, state: v })}
                    placeholder="Haryana"
                  />

                  <InputField
                    label="Display Price *"
                    value={editingItem.price || ""}
                    onChange={(v) => setEditingItem({ ...editingItem, price: v })}
                    placeholder="₹1.45 Cr or ₹45,000/month"
                  />
                  <InputField
                    label="Price per Sqft"
                    value={editingItem.pricePerSqft || ""}
                    onChange={(v) => setEditingItem({ ...editingItem, pricePerSqft: v })}
                    placeholder="₹8,500/sqft"
                  />
                  <div className="flex items-center gap-3 pt-6">
                    <input
                      type="checkbox"
                      id="negotiable"
                      checked={!!editingItem.negotiable}
                      onChange={(e) => setEditingItem({ ...editingItem, negotiable: e.target.checked })}
                      className="w-4 h-4 rounded text-orange-400 bg-slate-900 border-slate-700"
                    />
                    <label htmlFor="negotiable" className="text-xs font-semibold text-slate-300 cursor-pointer">
                      Price is Negotiable
                    </label>
                  </div>
                  <InputField
                    label="Possession Date / Status"
                    value={editingItem.possession || ""}
                    onChange={(v) => setEditingItem({ ...editingItem, possession: v })}
                    placeholder="Ready to Move / Dec 2025"
                  />
                </div>
              </SectionCard>

              {/* 3. Physical Specs */}
              <SectionCard title="3. Property Specifications & Dimensions" icon={Settings}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <InputField
                    label="Carpet / Super Area"
                    value={editingItem.area || ""}
                    onChange={(v) => setEditingItem({ ...editingItem, area: v })}
                    placeholder="1850 sq.ft."
                  />
                  <InputField
                    label="Bedrooms (BHK)"
                    value={editingItem.bedrooms || ""}
                    onChange={(v) => setEditingItem({ ...editingItem, bedrooms: v })}
                    placeholder="3 BHK + Servant"
                  />
                  <InputField
                    label="Bathrooms"
                    value={editingItem.bathrooms || ""}
                    onChange={(v) => setEditingItem({ ...editingItem, bathrooms: v })}
                    placeholder="3"
                  />
                  <InputField
                    label="Facing"
                    value={editingItem.facing || ""}
                    onChange={(v) => setEditingItem({ ...editingItem, facing: v })}
                    placeholder="East Facing / Park View"
                  />
                  <InputField
                    label="Floor"
                    value={editingItem.floor || ""}
                    onChange={(v) => setEditingItem({ ...editingItem, floor: v })}
                    placeholder="7th Floor"
                  />
                  <InputField
                    label="Total Floors in Building"
                    value={editingItem.totalFloors || ""}
                    onChange={(v) => setEditingItem({ ...editingItem, totalFloors: v })}
                    placeholder="24 Floors"
                  />
                  <InputField
                    label="Parking Spaces"
                    value={editingItem.parking || ""}
                    onChange={(v) => setEditingItem({ ...editingItem, parking: v })}
                    placeholder="2 Covered Reserved"
                  />
                  <SelectField
                    label="Furnishing"
                    value={editingItem.furnishing || "Unfurnished"}
                    onChange={(v) => setEditingItem({ ...editingItem, furnishing: v })}
                    options={[
                      { label: "Unfurnished", value: "Unfurnished" },
                      { label: "Semi-Furnished", value: "Semi-Furnished" },
                      { label: "Fully Furnished", value: "Fully Furnished" },
                      { label: "Not Applicable", value: "Not Applicable" },
                    ]}
                  />
                </div>
              </SectionCard>

              {/* 4. Multiple Images Gallery Manager */}
              <SectionCard title="4. Property Image Gallery (Multiple Images)" icon={ImageIcon}>
                <div className="space-y-4">
                  <p className="text-xs text-slate-400">
                    Upload multiple high-resolution photos of the inventory. You can set any image as the primary card thumbnail.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <label className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors flex items-center justify-center gap-2 shrink-0 shadow cursor-pointer">
                      {uploadingImage ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Uploading Image...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4" />
                          <span>Upload Image From Computer</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const f = e.target.files?.[0];
                              if (f) handleDirectImageUpload(f);
                            }}
                          />
                        </>
                      )}
                    </label>

                    <div className="flex-1 flex gap-2">
                      <input
                        type="text"
                        placeholder="Or paste property image URL (https://...)"
                        value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addImageUrl(); } }}
                        className="flex-1 px-4 py-2 bg-[#111827] border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 outline-none focus:border-orange-400"
                      />
                      <button
                        type="button"
                        onClick={addImageUrl}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold shrink-0"
                      >
                        + Add URL
                      </button>
                    </div>
                  </div>

                  {/* Uploaded Images Grid */}
                  <div>
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Gallery Photos ({(editingItem.images || []).length}):
                    </div>
                    {(editingItem.images || []).length === 0 ? (
                      <div className="p-6 rounded-xl bg-[#111827]/60 border border-slate-800 text-center text-xs text-slate-500">
                        No property photos added yet. Upload from computer or add URLs above.
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                        {(editingItem.images || []).map((imgUrl, idx) => {
                          const isThumb = editingItem.thumbnail === imgUrl;
                          return (
                            <div key={idx} className="relative rounded-xl overflow-hidden border border-slate-800 bg-[#111827] aspect-[4/3] group">
                              <img src={imgUrl} alt={`Photo ${idx + 1}`} className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                              {isThumb && (
                                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#FF7900] text-slate-950 text-[9px] font-extrabold uppercase">
                                  Primary Thumbnail
                                </span>
                              )}

                              <div className="absolute top-2 right-2 flex items-center gap-1">
                                {!isThumb && (
                                  <button
                                    type="button"
                                    onClick={() => setEditingItem({ ...editingItem, thumbnail: imgUrl })}
                                    className="p-1 rounded bg-black/70 text-slate-300 hover:text-orange-400 text-[10px] font-bold"
                                    title="Set as Primary Thumbnail"
                                  >
                                    ★ Set Main
                                  </button>
                                )}
                                <button
                                  type="button"
                                  onClick={() => removeImage(idx)}
                                  className="p-1 rounded bg-red-600/90 text-white hover:bg-red-500"
                                  title="Delete Photo"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              <div className="absolute bottom-1.5 left-2 right-2 truncate text-[10px] text-slate-400 font-mono">
                                #{idx + 1} · {imgUrl}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </SectionCard>

              {/* 5. Description, Amenities & Highlights */}
              <SectionCard title="5. Description, Amenities & Highlights" icon={CheckCircle2}>
                <div className="space-y-4">
                  <InputField
                    label="Short Summary Description"
                    rows={2}
                    value={editingItem.shortDesc || ""}
                    onChange={(v) => setEditingItem({ ...editingItem, shortDesc: v })}
                    placeholder="Short 2-line summary for card previews..."
                  />

                  <InputField
                    label="Full Detailed Property Description"
                    rows={5}
                    value={editingItem.fullDesc || ""}
                    onChange={(v) => setEditingItem({ ...editingItem, fullDesc: v })}
                    placeholder="Complete detailed overview, layout, connectivity and specifications..."
                  />

                  {/* Amenities Manager */}
                  <div className="pt-4 border-t border-slate-800 space-y-2">
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Amenities ({editingItem.amenities?.length || 0})
                    </label>

                    <div className="flex flex-wrap gap-1.5">
                      {(editingItem.amenities || []).map((amenity, idx) => (
                        <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs bg-orange-500/15 text-orange-300 border border-orange-500/30">
                          <span>{amenity}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = (editingItem.amenities || []).filter((_, i) => i !== idx);
                              setEditingItem({ ...editingItem, amenities: updated });
                            }}
                            className="hover:text-red-400"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2 pt-2">
                      <input
                        type="text"
                        placeholder="Add custom amenity..."
                        value={customAmenity}
                        onChange={(e) => setCustomAmenity(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            if (customAmenity.trim()) {
                              setEditingItem({
                                ...editingItem,
                                amenities: [...(editingItem.amenities || []), customAmenity.trim()],
                              });
                              setCustomAmenity("");
                            }
                          }
                        }}
                        className="flex-1 px-4 py-2 bg-[#111827] border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (customAmenity.trim()) {
                            setEditingItem({
                              ...editingItem,
                              amenities: [...(editingItem.amenities || []), customAmenity.trim()],
                            });
                            setCustomAmenity("");
                          }
                        }}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold"
                      >
                        + Add Amenity
                      </button>
                    </div>

                    {/* Quick Amenity Suggestions */}
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {commonAmenities.map((ca) => (
                        <button
                          key={ca}
                          type="button"
                          onClick={() => {
                            if (!editingItem.amenities?.includes(ca)) {
                              setEditingItem({
                                ...editingItem,
                                amenities: [...(editingItem.amenities || []), ca],
                              });
                            }
                          }}
                          className="px-2 py-0.5 rounded text-[10px] bg-white/5 border border-white/10 text-slate-300 hover:text-orange-300 hover:border-orange-400"
                        >
                          + {ca}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Highlights Manager */}
                  <div className="pt-4 border-t border-slate-800 space-y-2">
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Key Highlights &amp; Selling Points
                    </label>

                    {(editingItem.highlights || []).map((hl, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={hl}
                          onChange={(e) => {
                            const updated = [...(editingItem.highlights || [])];
                            updated[idx] = e.target.value;
                            setEditingItem({ ...editingItem, highlights: updated });
                          }}
                          className="flex-1 px-4 py-2 bg-[#111827] border border-slate-700/80 rounded-xl text-xs text-white outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = (editingItem.highlights || []).filter((_, i) => i !== idx);
                            setEditingItem({ ...editingItem, highlights: updated });
                          }}
                          className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}

                    <div className="flex gap-2 pt-1">
                      <input
                        type="text"
                        placeholder="Add new highlight point..."
                        value={customHighlight}
                        onChange={(e) => setCustomHighlight(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            if (customHighlight.trim()) {
                              setEditingItem({
                                ...editingItem,
                                highlights: [...(editingItem.highlights || []), customHighlight.trim()],
                              });
                              setCustomHighlight("");
                            }
                          }
                        }}
                        className="flex-1 px-4 py-2 bg-[#111827] border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (customHighlight.trim()) {
                            setEditingItem({
                              ...editingItem,
                              highlights: [...(editingItem.highlights || []), customHighlight.trim()],
                            });
                            setCustomHighlight("");
                          }
                        }}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold"
                      >
                        + Add Highlight
                      </button>
                    </div>
                  </div>
                </div>
              </SectionCard>

              {/* 6. Legal, Contact & SEO Controls */}
              <SectionCard title="6. Legal, Contacts & SEO Metadata" icon={ShieldCheck}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <InputField
                    label="HRERA Registration No"
                    value={editingItem.reraNumber || ""}
                    onChange={(v) => setEditingItem({ ...editingItem, reraNumber: v })}
                    placeholder="HRERA-PKL-GGM-1234-2024"
                  />
                  <InputField
                    label="Contact Phone"
                    value={editingItem.contactPhone || ""}
                    onChange={(v) => setEditingItem({ ...editingItem, contactPhone: v })}
                    placeholder="+91 77430 00070"
                  />
                  <InputField
                    label="WhatsApp Number (numbers only)"
                    value={editingItem.whatsappNumber || ""}
                    onChange={(v) => setEditingItem({ ...editingItem, whatsappNumber: v })}
                    placeholder="917743000070"
                  />

                  <div className="sm:col-span-2 lg:col-span-3">
                    <InputField
                      label="SEO Meta Title"
                      value={editingItem.seoTitle || ""}
                      onChange={(v) => setEditingItem({ ...editingItem, seoTitle: v })}
                      placeholder="3 BHK Luxury Apartment in Sector 85 Gurugram | DS Group"
                    />
                  </div>

                  <div className="sm:col-span-2 lg:col-span-3">
                    <InputField
                      label="SEO Meta Description"
                      rows={2}
                      value={editingItem.seoDescription || ""}
                      onChange={(v) => setEditingItem({ ...editingItem, seoDescription: v })}
                      placeholder="Explore this verified 3 BHK apartment in Sector 85 Gurgaon with zero brokerage..."
                    />
                  </div>

                  <div className="sm:col-span-2 lg:col-span-3">
                    <InputField
                      label="SEO Keywords (comma separated)"
                      value={editingItem.seoKeywords || ""}
                      onChange={(v) => setEditingItem({ ...editingItem, seoKeywords: v })}
                      placeholder="3 BHK flats sector 85, luxury apartments gurgaon, ready to move flats"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-3">
                    <input
                      type="checkbox"
                      id="featuredProp"
                      checked={!!editingItem.featured}
                      onChange={(e) => setEditingItem({ ...editingItem, featured: e.target.checked })}
                      className="w-4 h-4 rounded text-orange-400 bg-slate-900 border-slate-700"
                    />
                    <label htmlFor="featuredProp" className="text-xs font-semibold text-slate-300 cursor-pointer">
                      ⭐ Feature this property on homepage
                    </label>
                  </div>

                  <InputField
                    label="Priority Order (Higher = First)"
                    type="number"
                    value={editingItem.priority || 0}
                    onChange={(v) => setEditingItem({ ...editingItem, priority: parseInt(v) || 0 })}
                  />

                  <SelectField
                    label="Publish Status *"
                    value={editingItem.publishStatus || "Published"}
                    onChange={(v) => setEditingItem({ ...editingItem, publishStatus: v })}
                    options={[
                      { label: "Published (Visible on website)", value: "Published" },
                      { label: "Draft (Hidden from public)", value: "Draft" },
                    ]}
                  />
                </div>
              </SectionCard>

              {/* Modal Footer CTAs */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800 sticky bottom-0 bg-[#091426] z-10">
                <button
                  type="button"
                  onClick={() => {
                    setEditingItem(null);
                    setIsCreating(false);
                  }}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white bg-white/5 hover:bg-white/10"
                >
                  Cancel
                </button>

                <SaveBtn
                  loading={saving}
                  onClick={handleSave}
                  label={isCreating ? "Create & Publish Inventory" : "Save Inventory Changes"}
                />
              </div>
            </form>
          </div>
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
      case "inventories": return <InventoriesPanel showToast={showToast} />;
      case "properties": return <PropertiesPanel showToast={showToast} />;
      case "about": return <AboutPanel showToast={showToast} />;
      case "services": return <ServicesPanel showToast={showToast} />;
      case "social": return <SocialPanel showToast={showToast} />;
      case "footer": return <FooterPanel showToast={showToast} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: "#111827", fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
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
            style={{ background: "linear-gradient(135deg, #1e40af, #FF7900)" }}>
            <Building2 className="w-5 h-5 text-white" />
          </div>
          {sidebarOpen && (
            <div className="overflow-hidden">
              <p className="text-xs font-extrabold text-white tracking-tight leading-tight">DS GROUP</p>
              <p className="text-[9px] font-semibold text-orange-400 uppercase tracking-wider">Admin Panel</p>
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
              style={activeTab === id ? { background: "linear-gradient(135deg, rgba(255,121,0,0.15), rgba(30,64,175,0.15))", border: "1px solid rgba(255,121,0,0.2)" } : {}}
              title={!sidebarOpen ? label : undefined}
            >
              <Icon className={`w-4 h-4 shrink-0 ${activeTab === id ? "text-orange-400" : ""}`} />
              {sidebarOpen && <span className="text-xs font-semibold truncate">{label}</span>}
              {sidebarOpen && activeTab === id && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-orange-400" />}
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
