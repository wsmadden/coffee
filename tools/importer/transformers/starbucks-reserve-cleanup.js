/**
 * Starbucks Reserve DOM Cleanup Transformer
 * Removes non-content elements before parsing
 */

export function transform(document) {
  // Remove navigation
  const nav = document.querySelector('.navbar18_component');
  if (nav) nav.remove();

  // Remove footer
  const footer = document.querySelector('.footer4_component');
  if (footer) footer.remove();

  // Remove cookie consent banner
  const cookieBanner = document.querySelector('#consent_blackbar');
  if (cookieBanner) cookieBanner.remove();

  // Remove TrustArc consent elements
  const trustArc = document.querySelector('#teconsent');
  if (trustArc) trustArc.remove();

  // Remove iframes (tracking, consent frames)
  document.querySelectorAll('iframe').forEach(iframe => iframe.remove());

  // Remove global styles embeds
  document.querySelectorAll('.global-styles').forEach(el => el.remove());

  // Remove Google Tag Manager noscript
  document.querySelectorAll('.w-embed.w-iframe').forEach(el => el.remove());

  // Remove border modifier decorative elements
  document.querySelectorAll('.border-modifier').forEach(el => el.remove());

  // Remove nav overlay
  const navOverlay = document.querySelector('.w-nav-overlay');
  if (navOverlay) navOverlay.remove();

  return document;
}
