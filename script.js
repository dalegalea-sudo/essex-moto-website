const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open'); menu.setAttribute('aria-expanded','false');
}));
document.querySelectorAll('.filter').forEach(btn => btn.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const filter = btn.dataset.filter;
  document.querySelectorAll('.category-card').forEach(card => {
    card.hidden = filter !== 'all' && card.dataset.category !== filter;
  });
}));
document.querySelectorAll('[data-enquiry]').forEach(link => link.addEventListener('click', () => {
  const select = document.querySelector('select[name="interest"]');
  const option = [...select.options].find(o => o.text === link.dataset.enquiry);
  if (option) select.value = option.value;
}));
document.getElementById('enquiry-form').addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const subject = encodeURIComponent('Essex Moto enquiry — ' + data.get('interest'));
  const body = encodeURIComponent(
    'Name: ' + data.get('name') + '\\nEmail: ' + data.get('email') +
    '\\nInterested in: ' + data.get('interest') + '\\n\\n' + data.get('message')
  );
  // Add the verified Essex Moto business email address here before publishing.
  const businessEmail = '';
  if (!businessEmail) {
    alert('The enquiry form is ready, but Essex Moto needs to add its business email address before enquiries can be sent.');
    return;
  }
  window.location.href = `mailto:${businessEmail}?subject=${subject}&body=${body}`;
});
document.getElementById('year').textContent = new Date().getFullYear();
