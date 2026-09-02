const toast = document.getElementById('toast');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 1800);
}

document.querySelectorAll('.action').forEach(button => {
  button.addEventListener('click', () => {
    showToast(button.dataset.action || 'Selected');
  });
});

document.querySelectorAll('.nav-item:not(.logout)').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
    });

    button.classList.add('active');
    showToast(button.dataset.label + ' selected');
  });
});

document.querySelectorAll('.order-status').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.order-status').forEach(item => {
      item.classList.remove('active');
    });

    button.classList.add('active');
    showToast(button.dataset.label + ' orders');
  });
});

document.querySelectorAll('.bottom-nav button').forEach(button => {
  button.addEventListener('click', () => {
    const destination = button.dataset.href;

    if (destination) {
      window.location.href = destination;
      return;
    }

    document.querySelectorAll('.bottom-nav button').forEach(item => {
      item.classList.remove('active');
    });

    button.classList.add('active');
    showToast(button.dataset.label);
  });
});
