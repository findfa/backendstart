const SUPABASE_URL = "https://YOUR-PROJECT.supabase.co";
const SUPABASE_ANON_KEY = "YOUR-ANON-KEY";
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const coursesDiv = document.getElementById("courses");
const searchInput = document.getElementById("search");

const COURSES = [
  { title: "AI Foundations", summary: "Learn basics of AI.", duration: "6 weeks" },
  { title: "Machine Learning", summary: "Hands-on ML with Python.", duration: "8 weeks" },
  { title: "Deep Learning", summary: "Neural networks explained.", duration: "8 weeks" },
  { title: "Natural Language Processing", summary: "Work with text & transformers.", duration: "6 weeks" },
  { title: "AI Ethics", summary: "Fairness, transparency, law.", duration: "4 weeks" }
];

function renderCourses(query = "") {
  coursesDiv.innerHTML = "";
  COURSES.filter(c => c.title.toLowerCase().includes(query.toLowerCase()))
    .forEach(c => {
      const card = document.createElement("div");
      card.className = "course-card";
      card.innerHTML = `<h3>${c.title}</h3><p>${c.summary}</p><p><b>${c.duration}</b></p>
        <button onclick="alert('Enrolled in ${c.title}!')">Enroll</button>`;
      coursesDiv.appendChild(card);
    });
}

searchInput.addEventListener("input", e => renderCourses(e.target.value));

// Protect page
(async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    window.location.href = "index.html";
  } else {
    renderCourses();
  }
})();

async function logout() {
  await supabase.auth.signOut();
  window.location.href = "index.html";
}
