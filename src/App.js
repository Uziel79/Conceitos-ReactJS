import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    api
      .post("repositories", {
        title: `Novo repositório - ${Date.now()}`,
        url: "https://github.com/Rocketseat/unform",
        techs: ["React", "ReactNative", "TypeScript", "ContextApi"],
      })
      .then((response) => {
        setRepositories([...repositories, response.data]);
      });
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(() => {
      setRepositories(repositories.filter((repo) => repo.id !== id));
    });
  }

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories &&
          repositories.map((repo) => (
            <li key={repo.id}>
              {repo.title}

              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
