const SUPABASE_URL = "https://YOUR-PROJECT.supabase.co";
const SUPABASE_ANON_KEY = "YOUR-ANON-KEY";
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const courseList = document.getElementById("course-list");
const form = document.getElementById("course-form");

// Protect the admin page
(async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    window.location.href = "index.html";
    return;
  }

  const { data: { user } } = await supabase.auth.getUser();

  // Only allow YOUR email
  if (user.email !== "your-admin-email@example.com") {
    alert("Access denied");
    window.location.href = "courses.html";
  } else {
    loadCourses();
  }
})();

// Add course
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("course-title").value;
  const summary = document.getElementById("course-summary").value;
  const duration = document.getElementById("course-duration").value;

  const { error } = await supabase
    .from("courses")
    .insert([{ title, summary, duration }]);

  if (error) {
    alert("Error: " + error.message);
  } else {
    form.reset();
    loadCourses();
  }
});

// Load all courses
async function loadCourses() {
  const { data, error } = await supabase.from("courses").select("*");
  if (error) {
    console.error(error);
    return;
  }

  courseList.innerHTML = "";
  data.forEach(c => {
    const div = document.createElement("div");
    div.className = "course-card";
    div.innerHTML = `
      <h3>${c.title}</h3>
      <p>${c.summary}</p>
      <p><b>${c.duration}</b></p>
      <button onclick="deleteCourse(${c.id})">Delete</button>
    `;
    courseList.appendChild(div);
  });
}

// Delete course
async function deleteCourse(id) {
  if (!confirm("Are you sure you want to delete this course?")) return;

  const { error } = await supabase.from("courses").delete().eq("id", id);

  if (error) {
    alert("Error deleting: " + error.message);
  } else {
    loadCourses();
  }
}

async function logout() {
  await supabase.auth.signOut();
  window.location.href = "index.html";
}
