/**
 * LigaPro Evolution - Módulo Sala de Prensa, Noticias & Media Hub (Estilo FIFA+)
 * Asociación de Fútbol Amateur de Arauco
 */

import { getNews, addNews, getMediaGallery, addMediaPhoto, addMediaVideo } from './data.js';
import { getCurrentRole, ROLES } from './auth.js';
import { broadcastSyncEvent } from './realtime.js';

let activeCategory = 'all';

export function initNewsModule() {
  renderNewsView();
  setupNewsEventListeners();

  // Escuchar actualizaciones de noticias y medios
  window.addEventListener('ligapro:news-updated', () => renderNewsView());
  window.addEventListener('ligapro:media-updated', () => renderNewsView());
  window.addEventListener('ligapro:role-changed', () => updatePublishButtonVisibility());
}

/**
 * Renderiza toda la vista de Sala de Prensa
 */
export function renderNewsView() {
  const newsList = getNews();
  const media = getMediaGallery();

  renderHeroArticle(newsList);
  renderCategoryFilterBar();
  renderArticlesGrid(newsList);
  renderPhotoGallery(media.photos || []);
  renderVideoHighlights(media.videos || []);
  updatePublishButtonVisibility();
}

/**
 * Renderiza el artículo principal destacado (Hero News)
 */
function renderHeroArticle(newsList) {
  const heroContainer = document.getElementById('news-hero-container');
  if (!heroContainer) return;

  const heroItem = newsList.find(n => n.hero) || newsList[0];
  if (!heroItem) {
    heroContainer.innerHTML = '';
    return;
  }

  heroContainer.innerHTML = `
    <div class="news-hero-card" onclick="window.ligaproReadArticle('${heroItem.id}')" style="background-image: linear-gradient(180deg, rgba(7, 9, 14, 0.2) 0%, rgba(7, 9, 14, 0.88) 65%, #07090e 100%), url('${heroItem.image}');">
      <div class="news-hero-badge-row">
        <span class="fifa-pill-badge pill-live">${heroItem.categoryBadge || '🔥 DESTACADO'}</span>
        <span class="news-read-time">⏱️ ${heroItem.readTime}</span>
      </div>
      <div class="news-hero-content">
        <div class="news-meta-sub">
          <span>📅 ${heroItem.date}</span> • <span>✍️ ${heroItem.author}</span>
        </div>
        <h2 class="news-hero-title">${heroItem.title}</h2>
        <p class="news-hero-excerpt">${heroItem.excerpt}</p>
        <div class="news-hero-actions">
          <button class="btn btn-primary btn-sm btn-fifa-glow">
            <span>📖 Leer Crónica Completa</span>
          </button>
          <div class="news-tags-group">
            ${(heroItem.tags || []).map(t => `<span class="news-tag">#${t}</span>`).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Barra de filtros de categorías de noticias
 */
function renderCategoryFilterBar() {
  const filterContainer = document.getElementById('news-category-filters');
  if (!filterContainer) return;

  const categories = [
    { id: 'all', label: '⚡ Todas las Noticias' },
    { id: 'Torneo Oficial', label: '⚽ Torneo Oficial' },
    { id: 'Selección Comunal', label: '🇨🇱 Selección Arauco' },
    { id: 'Tribunal & Disciplina', label: '⚖️ Tribunal de Penas' },
    { id: 'Institucional', label: '🏛️ Institucional' }
  ];

  filterContainer.innerHTML = categories.map(c => `
    <button class="filter-pill-btn ${activeCategory === c.id ? 'active' : ''}" onclick="window.ligaproFilterNews('${c.id}')">
      ${c.label}
    </button>
  `).join('');
}

/**
 * Grilla de noticias secundarias
 */
function renderArticlesGrid(newsList) {
  const grid = document.getElementById('news-articles-grid');
  if (!grid) return;

  const heroItem = newsList.find(n => n.hero) || newsList[0];
  const secondaryList = newsList.filter(n => n.id !== heroItem?.id);

  const filtered = activeCategory === 'all' 
    ? secondaryList 
    : secondaryList.filter(n => n.category === activeCategory);

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);">
        <span style="font-size: 2.5rem; display: block; margin-bottom: 0.5rem;">📰</span>
        No hay artículos en esta categoría en este momento.
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(item => `
    <article class="news-card" onclick="window.ligaproReadArticle('${item.id}')">
      <div class="news-card-thumb" style="background-image: url('${item.image}');">
        <span class="news-card-badge">${item.categoryBadge || item.category}</span>
        <span class="news-card-time">${item.readTime}</span>
      </div>
      <div class="news-card-body">
        <div class="news-card-meta">
          <span>📅 ${item.date}</span> • <span>${item.author}</span>
        </div>
        <h3 class="news-card-title">${item.title}</h3>
        <p class="news-card-text">${item.excerpt}</p>
        <div class="news-card-footer">
          <span class="read-more-link">Continuar leyendo &rarr;</span>
        </div>
      </div>
    </article>
  `).join('');
}

/**
 * Galería de fotos oficiales de la cancha
 */
function renderPhotoGallery(photos) {
  const container = document.getElementById('news-photos-track');
  if (!container) return;

  if (photos.length === 0) {
    container.innerHTML = `<div style="color: var(--text-muted); padding: 1rem;">No hay fotos publicadas en la jornada.</div>`;
    return;
  }

  container.innerHTML = photos.map(p => `
    <div class="photo-card" onclick="window.ligaproOpenPhotoModal('${p.url}', '${p.title.replace(/'/g, "\\'")}', '${p.match.replace(/'/g, "\\'")}')">
      <img src="${p.url}" alt="${p.title}" loading="lazy" class="photo-card-img" />
      <div class="photo-card-overlay">
        <div class="photo-card-info">
          <div style="font-size: 0.7rem; color: var(--accent-cyan); font-weight: 700; text-transform: uppercase;">${p.match}</div>
          <div style="font-size: 0.85rem; font-weight: 700; color: #fff;">${p.title}</div>
          <div style="font-size: 0.7rem; color: var(--text-muted);">🏟️ ${p.venue}</div>
        </div>
      </div>
    </div>
  `).join('');
}

/**
 * Videoteca y repetición de goles de la fecha
 */
function renderVideoHighlights(videos) {
  const container = document.getElementById('news-videos-grid');
  if (!container) return;

  if (videos.length === 0) {
    container.innerHTML = `<div style="color: var(--text-muted); padding: 1rem;">Aún no se suben goles de la fecha.</div>`;
    return;
  }

  container.innerHTML = videos.map(v => `
    <div class="video-card" onclick="window.ligaproPlayVideo('${v.id}')">
      <div class="video-thumb-wrapper">
        <img src="${v.thumbnail}" alt="${v.title}" class="video-thumb-img" />
        <div class="video-play-button">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
        </div>
        <span class="video-duration-tag">${v.duration}</span>
      </div>
      <div class="video-info">
        <div class="video-cat-tag">${v.category}</div>
        <h4 class="video-title">${v.title}</h4>
        <div class="video-meta-row">
          <span>👁️ ${v.views}</span> • <span>${v.description}</span>
        </div>
      </div>
    </div>
  `).join('');
}

/**
 * Configura escuchadores de eventos y funciones globales para la vista de noticias
 */
function setupNewsEventListeners() {
  // Filtro de noticias
  window.ligaproFilterNews = (cat) => {
    activeCategory = cat;
    renderCategoryFilterBar();
    renderArticlesGrid(getNews());
  };

  // Ver artículo en modal completo
  window.ligaproReadArticle = (articleId) => {
    const newsList = getNews();
    const article = newsList.find(n => n.id === articleId);
    if (!article) return;

    const modal = document.getElementById('modal-article-view');
    if (!modal) return;

    document.getElementById('modal-article-image').src = article.image;
    document.getElementById('modal-article-category').textContent = article.categoryBadge || article.category;
    document.getElementById('modal-article-title').textContent = article.title;
    document.getElementById('modal-article-meta').innerHTML = `📅 ${article.date} • ✍️ Por ${article.author} • ⏱️ ${article.readTime}`;
    document.getElementById('modal-article-content').innerHTML = `
      <p style="font-size: 1.1rem; line-height: 1.6; font-weight: 600; color: #fff; margin-bottom: 1.25rem;">${article.excerpt}</p>
      <div style="font-size: 0.95rem; line-height: 1.8; color: var(--text-secondary);">${article.content}</div>
    `;

    modal.classList.add('active');
  };

  // Cerrar modal de artículo
  document.getElementById('modal-article-close')?.addEventListener('click', () => {
    document.getElementById('modal-article-view')?.classList.remove('active');
  });

  // Modal para ver foto ampliada
  window.ligaproOpenPhotoModal = (url, title, match) => {
    const modal = document.getElementById('modal-photo-lightbox');
    if (!modal) return;

    document.getElementById('lightbox-img').src = url;
    document.getElementById('lightbox-title').textContent = title;
    document.getElementById('lightbox-match').textContent = match;
    modal.classList.add('active');
  };

  document.getElementById('modal-lightbox-close')?.addEventListener('click', () => {
    document.getElementById('modal-photo-lightbox')?.classList.remove('active');
  });

  // Modal para reproducir video
  window.ligaproPlayVideo = (videoId) => {
    const media = getMediaGallery();
    const video = (media.videos || []).find(v => v.id === videoId);
    if (!video) return;

    const modal = document.getElementById('modal-video-player');
    const player = document.getElementById('video-player-element');
    if (!modal || !player) return;

    document.getElementById('modal-video-title').textContent = video.title;
    document.getElementById('modal-video-desc').textContent = video.description;
    player.src = video.videoUrl;
    modal.classList.add('active');
    player.play().catch(() => {});
  };

  document.getElementById('modal-video-close')?.addEventListener('click', () => {
    const modal = document.getElementById('modal-video-player');
    const player = document.getElementById('video-player-element');
    if (player) {
      player.pause();
      player.src = '';
    }
    modal?.classList.remove('active');
  });

  // Modal Publicar Noticia / Foto / Video
  const btnOpenPublish = document.getElementById('btn-open-publish-modal');
  const modalPublish = document.getElementById('modal-publish-backdrop');
  const btnClosePublish = document.getElementById('modal-publish-close');
  const formPublish = document.getElementById('form-publish-content');

  // Variables para almacenar los archivos subidos en base64 / blob
  let uploadedNewsImgData = null;
  let uploadedPhotoImgData = null;
  let uploadedVideoData = null;

  btnOpenPublish?.addEventListener('click', () => {
    modalPublish?.classList.add('active');
  });

  btnClosePublish?.addEventListener('click', () => {
    modalPublish?.classList.remove('active');
  });

  // Conectar dropzones con inputs de archivo
  setupDropzone('dropzone-news-file', 'pub-news-file', 'pub-news-preview', 'dropzone-news-content', (data) => {
    uploadedNewsImgData = data;
  });

  setupDropzone('dropzone-photo-file', 'pub-photo-file', 'pub-photo-preview', 'dropzone-photo-content', (data) => {
    uploadedPhotoImgData = data;
  });

  setupVideoDropzone('dropzone-video-file', 'pub-video-file', 'pub-video-preview', 'dropzone-video-content', (data) => {
    uploadedVideoData = data;
  });

  // Selector de tipo de publicación en formulario
  const selectType = document.getElementById('publish-type-select');
  selectType?.addEventListener('change', () => {
    const type = selectType.value;
    const gNews = document.getElementById('publish-group-news');
    const gPhoto = document.getElementById('publish-group-photo');
    const gVideo = document.getElementById('publish-group-video');
    if (gNews) gNews.style.display = type === 'news' ? 'block' : 'none';
    if (gPhoto) gPhoto.style.display = type === 'photo' ? 'block' : 'none';
    if (gVideo) gVideo.style.display = type === 'video' ? 'block' : 'none';
  });

  formPublish?.addEventListener('submit', (e) => {
    e.preventDefault();
    const type = selectType?.value || 'news';

    if (type === 'news') {
      const title = document.getElementById('pub-news-title').value.trim();
      const category = document.getElementById('pub-news-category').value;
      const excerpt = document.getElementById('pub-news-excerpt').value.trim();
      const content = document.getElementById('pub-news-content').value.trim();
      const imageUrl = uploadedNewsImgData || 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1000&q=80';

      addNews({
        title,
        category,
        categoryBadge: `📢 ${category.toUpperCase()}`,
        excerpt,
        content,
        image: imageUrl,
        author: 'Mesa Directiva de la Asociación',
        tags: [category]
      });

      broadcastSyncEvent('NEWS_PUBLISHED', {
        title,
        category,
        author: 'Mesa Directiva de la Asociación'
      });

      if (window.showToast) window.showToast("✅ Noticia publicada exitosamente con foto.");
    } else if (type === 'photo') {
      const title = document.getElementById('pub-photo-title').value.trim();
      const match = document.getElementById('pub-photo-match').value.trim() || 'Fecha Oficial';
      const venue = document.getElementById('pub-photo-venue').value.trim() || 'Estadio Municipal Ramón Burgos';
      const url = uploadedPhotoImgData || 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1000&q=80';

      addMediaPhoto({ title, match, venue, url, author: 'Prensa Arauco' });
      broadcastSyncEvent('MEDIA_PUBLISHED', { type: 'photo', title, match, venue });
      if (window.showToast) window.showToast("📸 Fotografía subida exitosamente desde tu dispositivo.");
    } else if (type === 'video') {
      const title = document.getElementById('pub-video-title').value.trim();
      const category = document.getElementById('pub-video-category').value;
      const desc = document.getElementById('pub-video-desc').value.trim();
      const videoUrl = uploadedVideoData || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';
      const thumb = uploadedPhotoImgData || 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80';

      addMediaVideo({
        title,
        category,
        description: desc,
        videoUrl,
        thumbnail: thumb,
        duration: "0:45"
      });
      broadcastSyncEvent('MEDIA_PUBLISHED', { type: 'video', title, category });
      if (window.showToast) window.showToast("🎥 Video / Gol subido exitosamente desde tu dispositivo.");
    }

    formPublish.reset();
    uploadedNewsImgData = null;
    uploadedPhotoImgData = null;
    uploadedVideoData = null;
    resetPreviews();
    modalPublish?.classList.remove('active');
    renderNewsView();
  });
}

function setupDropzone(dropzoneId, inputId, previewId, contentId, onDataReady) {
  const dropzone = document.getElementById(dropzoneId);
  const input = document.getElementById(inputId);
  const preview = document.getElementById(previewId);
  const content = document.getElementById(contentId);

  if (!dropzone || !input) return;

  dropzone.addEventListener('click', () => input.click());

  input.addEventListener('change', () => {
    const file = input.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (preview) {
          preview.src = result;
          preview.style.display = 'block';
        }
        if (content) content.style.display = 'none';
        onDataReady(result);
      };
      reader.readAsDataURL(file);
    }
  });
}

function setupVideoDropzone(dropzoneId, inputId, previewId, contentId, onDataReady) {
  const dropzone = document.getElementById(dropzoneId);
  const input = document.getElementById(inputId);
  const preview = document.getElementById(previewId);
  const content = document.getElementById(contentId);

  if (!dropzone || !input) return;

  dropzone.addEventListener('click', () => input.click());

  input.addEventListener('change', () => {
    const file = input.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      if (preview) {
        preview.src = fileUrl;
        preview.style.display = 'block';
      }
      if (content) content.style.display = 'none';
      
      // Convertir a base64 o usar ObjectURL
      const reader = new FileReader();
      reader.onload = (e) => {
        onDataReady(e.target?.result || fileUrl);
      };
      reader.readAsDataURL(file);
    }
  });
}

function resetPreviews() {
  ['pub-news-preview', 'pub-photo-preview'].forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.src = ''; el.style.display = 'none'; }
  });
  const vid = document.getElementById('pub-video-preview');
  if (vid) { vid.src = ''; vid.style.display = 'none'; }

  ['dropzone-news-content', 'dropzone-photo-content', 'dropzone-video-content'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'block';
  });
}

/**
 * Controla la visibilidad del botón de publicar (habilitado para administradores y prensa)
 */
function updatePublishButtonVisibility() {
  const btn = document.getElementById('btn-open-publish-modal');
  if (!btn) return;
  const role = getCurrentRole();
  btn.style.display = (role === ROLES.ADMIN || role === ROLES.REFEREE) ? 'inline-flex' : 'none';
}
