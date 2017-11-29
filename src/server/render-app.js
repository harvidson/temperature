import { APP_CONTAINER_CLASS, STATIC_PATH, WDS_PORT } from '../shared/config';
import { isProd } from '../shared/util';

function renderApp(title) {
  return `<!doctype html>
    <html>
      <head>
        <title>${title}</title>
        <link rel="stylesheet" href="https://unpkg.com/tachyons@4.8.1/css/tachyons.min.css"/>
<link rel="shortcut icon" href="${STATIC_PATH}/images/logo_T_grey_bgd_circle_icon.ico" type="image/x-icon"> 
        <link rel="stylesheet" href="${STATIC_PATH}/css/style.css">
      </head>
      <body>
        <div class="${APP_CONTAINER_CLASS}"></div>
        <script src="https://use.fontawesome.com/1eaaf0a07e.js"></script>
        <script src="${isProd ? STATIC_PATH : `http://localhost:${WDS_PORT}/dist`}/js/bundle.js"></script>
      </body>
    </html>`;
}

export default renderApp;

{/* */}
