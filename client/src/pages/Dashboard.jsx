import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="dashboard">
      <header>
        <h1>Expense Tracker</h1>
        <button onClick={logout}>Log out</button>
      </header>
      <p>
        Dashboard placeholder — expense list, add-expense form, and category
        breakdown chart will be built here in the next milestones.
      </p>
    </div>
  );
}
