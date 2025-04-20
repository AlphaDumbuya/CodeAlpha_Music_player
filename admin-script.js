
document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuButton = document.getElementById('mobileMenuButton');
  const sidebar = document.getElementById('sidebar');

  // Helper: Check if sidebar is open
  const isSidebarOpen = () => {
    return sidebar.classList.contains('translate-x-0');
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    sidebar.classList.toggle('translate-x-0');
    sidebar.classList.toggle('-translate-x-full');
  };

  // Close sidebar
  const closeSidebar = () => {
    sidebar.classList.remove('translate-x-0');
    sidebar.classList.add('-translate-x-full');
  };

  // Toggle on menu button click
  mobileMenuButton.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent click from triggering document listener
    toggleSidebar();
  });

  // Close when clicking outside sidebar
  document.addEventListener('click', (e) => {
    const clickedOutside = !sidebar.contains(e.target) && !mobileMenuButton.contains(e.target);
    if (clickedOutside && window.innerWidth < 768 && isSidebarOpen()) {
      closeSidebar();
    }
  });

  // Close when clicking a sidebar link
  sidebar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 768) {
        closeSidebar();
      }
    });
  });
});

// profile icon
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('profileToggle');
  const dropdown = document.getElementById('profileDropdown');

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('hidden');
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target) && !toggle.contains(e.target)) {
      dropdown.classList.add('hidden');
    }
  });
});
