import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService {
  constructor(private dataSource: DataSource) {}

  getHomePage(): string {
    const isConnected = this.dataSource.isInitialized;
    const dbStatus = isConnected ? 'Conectado ✅' : 'Desconectado ❌';
    const dbColor = isConnected ? '#058f05' : '#b00020';

    return `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Biblioteca Virtual</title>
        <style>
          ${this.css()}
        </style>
      </head>
      <body>
        <div class="admin-container">
          <div class="card">
            <div class="admin-header">
              <div class="header-left">
                <span class="header-icon">📚</span>
                <span class="header-title">Panel Principal - Biblioteca Virtual</span>
              </div>
              <button class="btn-primary" onclick="location.reload()">🔄 Refrescar</button>
            </div>

            <div class="search-bar">
              <span class="search-icon">🔍</span>
              <input type="text" placeholder="Buscar módulo o acción..." id="searchInput" onkeyup="filterCards()"/>
            </div>

            <div class="filters-bar">
              <div class="filter-selects">
                <label for="filter">Filtrar por:</label>
                <select id="filter" onchange="filterCards()">
                  <option value="all">Todos</option>
                  <option value="auth">Auth</option>
                  <option value="users">Usuarios</option>
                  <option value="books">Libros</option>
                  <option value="authors">Autores</option>
                  <option value="categories">Categorías</option>
                  <option value="loans">Préstamos</option>
                  <option value="reviews">Reseñas</option>
                </select>
              </div>
              <span style="color:${dbColor}; font-weight:bold;">Estado DB: ${dbStatus}</span>
            </div>

            <div class="table-wrapper">
              <table class="user-table" id="modulesTable">
                <thead>
                  <tr>
                    <th>Módulo</th>
                    <th>Descripción</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  ${this.renderRow('Auth', 'Gestión de autenticación y registro.', [
                    { text: 'Login', path: '/auth/login' },
                    { text: 'Registrar', path: '/auth/register' },
                  ])}
                  ${this.renderRow('Usuarios', 'Administración de usuarios del sistema.', [
                    { text: 'Ver', path: '/users' },
                    { text: 'Crear', path: '/users/create' },
                  ])}
                  ${this.renderRow('Libros', 'Control de libros registrados.', [
                    { text: 'Ver', path: '/books' },
                    { text: 'Agregar', path: '/books/create' },
                  ])}
                  ${this.renderRow('Autores', 'Gestión de autores de la biblioteca.', [
                    { text: 'Ver', path: '/authors' },
                    { text: 'Agregar', path: '/authors/create' },
                  ])}
                  ${this.renderRow('Categorías', 'Clasificación de libros.', [
                    { text: 'Ver', path: '/categories' },
                    { text: 'Agregar', path: '/categories/create' },
                  ])}
                  ${this.renderRow('Préstamos', 'Registro de préstamos activos.', [
                    { text: 'Ver', path: '/loans' },
                    { text: 'Registrar', path: '/loans/create' },
                  ])}
                  ${this.renderRow('Reseñas', 'Opiniones y valoraciones de libros.', [
                    { text: 'Ver', path: '/reviews' },
                    { text: 'Agregar', path: '/reviews/create' },
                  ])}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <script>
          function filterCards() {
            const input = document.getElementById('searchInput').value.toLowerCase();
            const filter = document.getElementById('filter').value;
            const rows = document.querySelectorAll('#modulesTable tbody tr');

            rows.forEach(row => {
              const text = row.textContent.toLowerCase();
              const matchesSearch = text.includes(input);
              const matchesFilter = filter === 'all' || row.dataset.module === filter;
              row.style.display = matchesSearch && matchesFilter ? '' : 'none';
            });
          }
        </script>
      </body>
      </html>
    `;
  }

  private renderRow(name: string, desc: string, actions: { text: string; path: string }[]) {
    const module = name.toLowerCase();
    return `
      <tr data-module="${module}">
        <td><b>${name}</b></td>
        <td>${desc}</td>
        <td class="actions">
          ${actions
            .map(
              (a) => `<button class="btn-primary" onclick="window.location.href='${a.path}'">${a.text}</button>`,
            )
            .join(' ')}
        </td>
      </tr>
    `;
  }

  private css(): string {
    return `
      :root { --bg: #f8fdf8; }

      .admin-container {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: flex-start;
        padding: 20px;
        border-radius: 16px;
        box-shadow: 0 1px 5px rgba(11, 72, 24, 0.856);
        background: var(--bg);
        font-family: "Nunito", sans-serif;
        max-width: 1150px;
        margin: 20px auto;
      }

      .card {
        background: #ffffff;
        border-radius: 16px;
        box-shadow: 0 1px 5px rgba(11, 72, 24, 0.856);
        padding: 25px;
        width: 100%;
      }

      .admin-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
      }

      .header-left {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .header-icon { color: #058f05; font-size: 1.5rem; }
      .header-title { font-size: 1.4rem; font-weight: 700; color: #034403; }

      .btn-primary {
        padding: 8px 14px;
        background: #058f05;
        color: #fff;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.2s ease, transform 0.1s ease;
      }

      .btn-primary:hover {
        background: #047a04;
        transform: translateY(-1px);
      }

      .search-bar {
        display: flex;
        align-items: center;
        background: #ffffff;
        border: 1px solid #178e0c;
        border-radius: 8px;
        padding: 8px 12px;
        margin: 15px 0;
      }

      .search-bar input {
        width: 100%;
        border: none;
        outline: none;
        font-size: 0.95rem;
      }

      .table-wrapper {
        background: #fff;
        border-radius: 16px;
        box-shadow: 0 1px 5px rgba(11, 72, 24, 0.3);
        overflow-x: auto;
      }

      .user-table {
        width: 100%;
        border-collapse: collapse;
      }

      .user-table thead {
        background-color: #058f05;
        color: #fff;
        text-align: left;
      }

      .user-table th, .user-table td {
        padding: 12px 14px;
        border-bottom: 1px solid #e3f2e1;
      }

      .actions {
        display: flex;
        gap: 10px;
      }
    `;
  }
}
