// Mesure d'audience GoatCounter (sans cookie) : https://xavier-tran-thiet.goatcounter.com
// Si le script n'est pas chargé (bloqueur, localhost), l'appel ne fait rien : le site fonctionne sans.
export function track(path, title = path) {
  try {
    window.goatcounter?.count?.({ path, title, event: true });
  } catch {
    /* la mesure d'audience ne doit jamais casser le site */
  }
}
