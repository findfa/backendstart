// Replace with your own Supabase project values
const SUPABASE_URL = "https://hsaoxuuqebjvwqcdwatk.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzYW94dXVxZWJqdndxY2R3YXRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxMjYxNDksImV4cCI6MjA3MTcwMjE0OX0._YffdBCmzCFYvB2dz64M9bOX9Cu-e7J-ialycqvc45k";

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const message = document.getElementById("message");

function showForm(type) {
  document.querySelectorAll(".form").forEach(f => f.classList.add("hidden"));
  document.getElementById(`${type}-form`).classList.remove("hidden");
}

// Login
document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    message.textContent = error.message;
  } else {
    window.location.href = "courses.html";
  }
});

// Signup
document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const fullName = document.getElementById("signup-name").value;
  const { error } = await supabase.auth.signUp({
    email, password,
    options: { data: { full_name: fullName } }
  });
  message.textContent = error ? error.message : "Check your email to confirm!";
});

// Forgot password
document.getElementById("forgot-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("forgot-email").value;
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin + "/index.html"
  });
  message.textContent = error ? error.message : "Reset link sent!";
});

// Google login
async function googleLogin() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: window.location.origin + "/courses.html" }
  });
  if (error) message.textContent = error.message;
}

