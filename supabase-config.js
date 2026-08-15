// =========================================================
// PINOY FRIES — Supabase clients (shared by every page)
// Fill these two values in from Supabase Dashboard > Project Settings > API
// =========================================================
const SUPABASE_URL = 'https://iwopylirxgwsxrnytgjp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3b3B5bGlyeGd3c3hybnl0Z2pwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4NzA3NDksImV4cCI6MjEwMDQ0Njc0OX0.5eX0pD7OsaoVG8mryN0tQ7lBacOweVIBk9GFgvkfUVI';

// Customer-facing client — used by index.html, cart.html, shipping.html,
// login.html, myorders.html, receipt.html, etc. Keeps its own session.
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { storageKey: 'sb-customer-auth' }
});

// Admin-only client — used by adminlogin.html, admin.html,
// admin-dashboard.html, allreceipts.html, inventory.html.
// Separate storageKey means logging in here does NOT touch the
// customer session above, and vice versa.
const sbAdmin = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { storageKey: 'sb-admin-auth' }
});

// Helper: get the currently signed-in CUSTOMER's profile row.
// Returns null if nobody is logged in on the customer session.
async function getCurrentProfile() {
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return null;
  const { data: profile, error } = await sb
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();
  if (error) return null;
  return profile;
}

// Helper: get the currently signed-in ADMIN's profile row.
// Returns null if nobody is logged in on the admin session.
async function getCurrentAdminProfile() {
  const { data: { user } } = await sbAdmin.auth.getUser();
  if (!user) return null;
  const { data: profile, error } = await sbAdmin
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();
  if (error) return null;
  return profile;
}