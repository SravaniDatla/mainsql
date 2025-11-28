// Global Variables
let currentUser = null;
// In-memory state — initialized from PostgreSQL backend
let events = [];
let wishlist = [];
let registrations = [];
let currentSlideIndex = 0;
// Coordinator Home filters
let coordinatorHomeStatus = 'active'; // active = upcoming + ongoing
let coordinatorHomeCategory = '';

// Sub-Club Details Data
const subClubDetails = {
    'web-dev': {
        title: 'Web Development Sub-Club',
        description: 'Focuses on building modern web applications using HTML, CSS, JavaScript, and various frameworks like React, Angular, and Vue.js. Members work on personal projects, participate in hackathons, and contribute to open-source initiatives.',
        members: '80+ Members',
        activities: 'Weekly coding sessions, project showcases, guest lectures from industry experts, and competitive programming.',
        imageUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    },
    'mobile-dev': {
        title: 'Mobile App Development Sub-Club',
        description: 'Dedicated to creating native and cross-platform mobile applications for iOS and Android. Members learn Swift, Kotlin, React Native, and Flutter, developing apps for campus needs and personal portfolios.',
        members: '60+ Members',
        activities: 'App design workshops, mobile hackathons, collaborative app development projects, and UI/UX design challenges.',
        imageUrl: 'https://images.unsplash.com/photo-1587407627257-cd75c5098f7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    },
    'cybersecurity': {
        title: 'Cybersecurity Sub-Club',
        description: 'Explores the principles of network security, ethical hacking, digital forensics, and data protection. Members engage in capture-the-flag (CTF) competitions, security audits, and awareness campaigns.',
        members: '40+ Members',
        activities: 'CTF training, security vulnerability assessments, guest speakers from cybersecurity firms, and ethical hacking demonstrations.',
        imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    },
    'dance-troupe': {
        title: 'Dance Troupe Sub-Club',
        description: 'A vibrant group dedicated to various dance forms, including classical, contemporary, hip-hop, and folk. Members choreograph and perform for campus events, competitions, and cultural festivals.',
        members: '50+ Members',
        activities: 'Regular practice sessions, choreography workshops, annual dance showcase, and participation in inter-college dance competitions.',
        imageUrl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    'music-ensemble': {
        title: 'Music Ensemble Sub-Club',
        description: 'Brings together musicians of all genres and instruments to create harmonious performances. Members form bands, practice individually, and collaborate on original compositions and covers.',
        members: '70+ Members',
        activities: 'Jam sessions, open mic nights, annual music concert, and participation in campus and external music events.',
        imageUrl: 'https://images.unsplash.com/photo-1470225620780-c4679db24a51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    },
    'drama-society': {
        title: 'Drama Society Sub-Club',
        description: 'Fosters theatrical talent through acting, directing, scriptwriting, and stage management. Members produce and perform plays, skits, and improvisational acts, exploring various dramatic styles.',
        members: '30+ Members',
        activities: 'Acting workshops, script reading sessions, annual play production, and participation in inter-college drama festivals.',
        imageUrl: 'https://images.unsplash.com/photo-1521336572900-f02067700926?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    },
    'basketball': {
        title: 'Basketball Team Sub-Club',
        description: 'For basketball enthusiasts looking to train, compete, and improve their skills. The team participates in inter-college tournaments and organizes friendly matches on campus.',
        members: '25+ Members',
        activities: 'Daily practice, scrimmage games, fitness training, and participation in regional basketball championships.',
        imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    },
    'football': {
        title: 'Football Team Sub-Club',
        description: 'A dedicated team for football players to hone their skills, strategize, and compete. The club organizes regular training sessions and participates in various university and local leagues.',
        members: '35+ Members',
        activities: 'Team practice, tactical training, friendly matches, and participation in inter-college football tournaments.',
        imageUrl: 'https://images.unsplash.com/photo-1508092729797-e79584601297?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    },
    'athletics': {
        title: 'Athletics Club Sub-Club',
        description: 'Promotes physical fitness and competitive spirit through track and field events. Members train for running, jumping, and throwing disciplines, representing the college in athletic meets.',
        members: '45+ Members',
        activities: 'Track and field training, fitness challenges, participation in inter-college athletic meets, and marathon training.',
        imageUrl: 'https://images.unsplash.com/photo-1552674610-9d90b731924b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    }
};

// Demo Events Data
const demoEvents = [
    {
        id: 1,
        title: "Tech Workshop: Web Development",
        category: "workshop",
        date: "2024-12-15",
        time: "14:00",
        location: "Computer Lab 101",
        description: "Learn the fundamentals of web development including HTML, CSS, and JavaScript. Perfect for beginners!",
        bannerUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        formLink: "https://forms.google.com/example1",
        coordinator: "coordinator@college.edu",
        clubName: "Tech Club",
        status: "approved",
        createdAt: "2024-12-01T10:00:00Z",
        rejectionReason: null
    },
    {
        id: 2,
        title: "Cultural Festival 2024",
        category: "cultural",
        date: "2024-12-20",
        time: "18:00",
        location: "Main Auditorium",
        description: "Celebrate diversity through music, dance, and art from around the world.",
        bannerUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        formLink: "https://forms.google.com/example2",
        coordinator: "coordinator@college.edu",
        clubName: "Cultural Club",
        status: "pending",
        createdAt: "2024-12-05T14:30:00Z",
        rejectionReason: null
    },
    {
        id: 3,
        title: "Career Fair 2025",
        category: "academic",
        date: "2025-01-10",
        time: "10:00",
        location: "Student Center",
        description: "Connect with top employers and explore career opportunities in various fields.",
        bannerUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        formLink: "https://forms.google.com/example3",
        coordinator: "coordinator@college.edu",
        clubName: "Career Development Club",
        status: "approved",
        createdAt: "2024-12-03T09:15:00Z",
        rejectionReason: null
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize slideshow for home page
    if (document.querySelector('.slideshow-container')) {
        initializeSlideshow();
        initializeEventListeners();
        showSlide(0);
    }

    // Initialize login page
    if (document.getElementById('loginForm')) {
        initializeLoginPage();
    }

    // Initialize dashboards
    if (document.querySelector('.dashboard-page')) {
        initializeDashboard();
    }

    // Load data from backend (PostgreSQL only)
    loadDataFromBackend().then(remoteLoaded => {
        if (!remoteLoaded) {
            console.error('Backend is unavailable. Please ensure the server is running.');
            return;
        }
        // After data ready, load appropriate UI pieces
        if (document.getElementById('publicEventsGrid')) {
            loadPublicEvents();
        }
        if (document.querySelector('.dashboard-page')) {
            initializeDashboard();
        }
    }).catch(err => {
        console.error('Error loading backend data:', err);
    });

    // Load public events on home page
    if (document.getElementById('publicEventsGrid')) {
        loadPublicEvents();
    }

    // Initialize sub-club detail modals if present
    if (document.getElementById('subClubDetailModal')) {
        initializeSubClubModals();
    }
}

// Cross-tab storage listener: when another tab updates data, reload backend data
window.addEventListener('storage', (e) => {
    if (!e.key) return;
    if (e.key === 'campusconnect_last_update') {
        // reload data from backend and refresh UI
        loadDataFromBackend().then(ok => {
            if (!ok) return;
            // Refresh relevant views depending on role
            if (currentUser && currentUser.role === 'faculty-coordinator') {
                loadFacultyRequests();
                updateFacultyStats();
            } else if (currentUser && currentUser.role === 'student-coordinator') {
                loadCoordinatorEvents();
                updateCoordinatorStats();
            } else {
                loadPublicEvents();
            }
        }).catch(() => {});
    }
});

// --------------- Backend sync helpers ---------------
const API_BASE = '';
let saveScheduled = false;
function loadDataFromBackend() {
    return fetch(API_BASE + '/api/data')
        .then(r => {
            if (!r.ok) throw new Error('no-backend');
            return r.json();
        })
        .then(data => {
            // Normalize ints to numbers
            events = (data.events || []).map(e => ({ ...e, id: Number(e.id) }));
            wishlist = (data.wishlist || []).map(w => ({ ...w, eventId: Number(w.eventId) }));
            registrations = (data.registrations || []).map(r => ({ ...r, eventId: Number(r.eventId) }));
            console.log('Loaded data from backend:', events.length, wishlist.length, registrations.length);
            return true;
        })
        .catch(err => {
            console.error('Backend not available. Please ensure PostgreSQL is running and the server is connected.');
            return false;
        });
}

function scheduleSaveToBackend(delay = 500) {
    if (saveScheduled) return;
    saveScheduled = true;
    setTimeout(() => {
        saveScheduled = false;
        saveAllToBackend();
    }, delay);
}

function saveAllToBackend() {
    const payload = {
        events: events,
        wishlist: wishlist.map(w => ({ eventId: w.eventId, userEmail: w.userEmail, addedAt: w.addedAt })),
        registrations: registrations.map(r => ({ eventId: r.eventId, userEmail: r.userEmail, registeredAt: r.registeredAt, eventTitle: r.eventTitle }))
    };

    return fetch(API_BASE + '/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    }).then(r => {
        if (!r.ok) throw new Error('failed-save');
        console.log('Saved data to PostgreSQL');
        // Notify other tabs (cross-tab) that data changed so they can reload
        try {
            localStorage.setItem('campusconnect_last_update', new Date().toISOString());
        } catch (e) {
            // ignore storage errors (e.g., private mode)
        }
    }).catch(err => {
        console.error('Failed saving to database:', err);
    });
}

// ==================== SUB-CLUB MODAL FUNCTIONALITY ====================

function initializeSubClubModals() {
    const subClubDetailButtons = document.querySelectorAll('.sub-club-detail-button');
    subClubDetailButtons.forEach(button => {
        button.addEventListener('click', function() {
            const clubId = this.dataset.club;
            openSubClubModal(clubId);
        });
    });

    const modal = document.getElementById('subClubDetailModal');
    const closeButton = modal.querySelector('.close-button');
    if (closeButton) {
        closeButton.addEventListener('click', closeSubClubModal);
    }
}

function openSubClubModal(clubId) {
    const modal = document.getElementById('subClubDetailModal');
    const club = subClubDetails[clubId];

    if (club) {
        const modalContent = modal.querySelector('.modal-content');
        modalContent.innerHTML = `
            <span class="close-button">&times;</span>
            <img src="${club.imageUrl}" alt="${club.title} Image" class="sub-club-modal-image">
            <h3 id="modalClubTitle">${club.title}</h3>
            <p id="modalClubDescription">${club.description}</p>
            <p id="modalClubMembers"><strong>Members:</strong> ${club.members}</p>
            <p id="modalClubActivities"><strong>Activities:</strong> ${club.activities}</p>
        `;
        modal.style.display = 'block';

        // Re-attach close event listener for the new close button
        const closeButton = modal.querySelector('.close-button');
        if (closeButton) {
            closeButton.addEventListener('click', closeSubClubModal);
        }
    }
}

function closeSubClubModal() {
    document.getElementById('subClubDetailModal').style.display = 'none';
}

// ==================== SLIDESHOW FUNCTIONALITY ====================

function initializeSlideshow() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = slides.length;

    if (totalSlides > 0) {
        setInterval(nextSlide, 3000);
    }
}

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = slides.length;

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    if (slides[index]) {
        slides[index].classList.add('active');
    }
    if (dots[index]) {
        dots[index].classList.add('active');
    }

    currentSlideIndex = index;
}

function nextSlide() {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
    showSlide(currentSlideIndex);
}

function prevSlide() {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
    showSlide(currentSlideIndex);
}

function currentSlide(index) {
    showSlide(index - 1);
}

// ==================== LOGIN FUNCTIONALITY ====================

function initializeLoginPage() {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', handleLogin);
}

function handleLogin(event) {
    event.preventDefault();
    
    const formData = new FormData(loginForm);
    const role = formData.get('role');
    const email = formData.get('email');
    const password = formData.get('password');
    
    // Basic validation
    if (!role || !email || !password) {
        showLoginMessage('Please fill in all fields.', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showLoginMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    // Password validation
    if (password !== 'Campus123') {
        showLoginMessage('Incorrect password. Please try again.', 'error');
        return;
    }
    
    // Role-based email validation
    const validEmails = {
        'student': 'student@college.edu',
        'student-coordinator': 'coordinator@college.edu',
        'faculty-coordinator': 'faculty@college.edu'
    };
    
    if (email !== validEmails[role]) {
        showLoginMessage(`Please use the correct email for ${role.replace('-', ' ')} role.`, 'error');
        return;
    }
    
    // Success login
    currentUser = { role, email };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    showLoginMessage(`Welcome ${role.replace('-', ' ')}! Redirecting...`, 'success');
    
    // Redirect to appropriate dashboard
    setTimeout(() => {
        switch(role) {
            case 'student':
                window.location.href = 'student-dashboard.html';
                break;
            case 'student-coordinator':
                window.location.href = 'student-coordinator-dashboard.html';
                break;
            case 'faculty-coordinator':
                window.location.href = 'faculty-dashboard.html';
                break;
        }
    }, 2000);
}

function showLoginMessage(message, type) {
    const loginMessage = document.getElementById('loginMessage');
    loginMessage.textContent = message;
    loginMessage.className = `login-message ${type}`;
    
    setTimeout(() => {
        loginMessage.textContent = '';
        loginMessage.className = 'login-message';
    }, 5000);
}

// Demo modal functions
function showDemoInfo() {
    document.getElementById('demoModal').style.display = 'block';
}

function closeDemoInfo() {
    document.getElementById('demoModal').style.display = 'none';
}

// ==================== DASHBOARD FUNCTIONALITY ====================

function initializeDashboard() {
    // Check if user is logged in
    const savedUser = localStorage.getItem('currentUser');
    if (!savedUser) {
        window.location.href = 'login.html';
        return;
    }
    
    currentUser = JSON.parse(savedUser);
    updateUserInterface();
    
    // Initialize based on current page
    const currentPage = window.location.pathname.split('/').pop();
    
    switch(currentPage) {
        case 'student-dashboard.html':
            initializeStudentDashboard();
            break;
        case 'student-coordinator-dashboard.html':
            initializeCoordinatorDashboard();
            break;
        case 'faculty-dashboard.html':
            initializeFacultyDashboard();
            break;
    }
}

function updateUserInterface() {
    const userNameElement = document.getElementById('userName');
    if (userNameElement) {
        userNameElement.textContent = currentUser.role.replace('-', ' ');
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// ==================== STUDENT DASHBOARD ====================

function initializeStudentDashboard() {
    loadStudentEvents();
    updateStudentStats();
    
    // Add event listeners
    const searchInput = document.getElementById('searchEvents');
    const categoryFilter = document.getElementById('categoryFilter');
    const dateFilter = document.getElementById('dateFilter');
    
    if (searchInput) searchInput.addEventListener('input', filterEvents);
    if (categoryFilter) categoryFilter.addEventListener('change', filterEvents);
    if (dateFilter) dateFilter.addEventListener('change', filterEvents);
}

function loadStudentEvents() {
    const approvedEvents = events.filter(event => event.status === 'approved');
    renderEvents(approvedEvents, 'eventsContainer', true);
    updateStudentStats();
}

function updateStudentStats() {
    const approvedEvents = events.filter(event => event.status === 'approved');
    const userRegistrations = registrations.filter(reg => reg.userEmail === currentUser.email);
    const userWishlist = wishlist.filter(item => item.userEmail === currentUser.email);
    
    const totalEventsElement = document.getElementById('totalEvents');
    const registeredEventsElement = document.getElementById('registeredEvents');
    const wishlistEventsElement = document.getElementById('wishlistEvents');
    
    if (totalEventsElement) totalEventsElement.textContent = approvedEvents.length;
    if (registeredEventsElement) registeredEventsElement.textContent = userRegistrations.length;
    if (wishlistEventsElement) wishlistEventsElement.textContent = userWishlist.length;
}

function filterEvents() {
    const searchTerm = document.getElementById('searchEvents')?.value.toLowerCase() || '';
    const categoryFilter = document.getElementById('categoryFilter')?.value || '';
    const dateFilter = document.getElementById('dateFilter')?.value || '';
    const statusFilter = document.getElementById('statusFilter')?.value || '';
    
    let filteredEvents = events.filter(event => event.status === 'approved');
    
    // Search filter
    if (searchTerm) {
        filteredEvents = filteredEvents.filter(event => 
            event.title.toLowerCase().includes(searchTerm) ||
            event.description.toLowerCase().includes(searchTerm) ||
            event.clubName.toLowerCase().includes(searchTerm)
        );
    }
    
    // Category filter
    if (categoryFilter) {
        filteredEvents = filteredEvents.filter(event => event.category === categoryFilter);
    }
    
    // Date filter
    if (dateFilter) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const nextWeek = new Date(today);
        nextWeek.setDate(nextWeek.getDate() + 7);
        
        const nextMonth = new Date(today);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        
        filteredEvents = filteredEvents.filter(event => {
            const eventDate = new Date(event.date);
            switch(dateFilter) {
                case 'today':
                    return eventDate.toDateString() === today.toDateString();
                case 'week':
                    return eventDate >= today && eventDate <= nextWeek;
                case 'month':
                    return eventDate >= today && eventDate <= nextMonth;
                case 'upcoming':
                    return eventDate > today;
                case 'ongoing':
                    return eventDate.toDateString() === today.toDateString();
                case 'completed':
                    return eventDate < today;
                default:
                    return true;
            }
        });
    }
    
    // Status filter (for student view - upcoming, ongoing, completed)
    if (statusFilter) {
        const today = new Date();
        filteredEvents = filteredEvents.filter(event => {
            const eventDate = new Date(event.date);
            switch(statusFilter) {
                case 'upcoming':
                    return eventDate > today;
                case 'ongoing':
                    return eventDate.toDateString() === today.toDateString();
                case 'completed':
                    return eventDate < today;
                default:
                    return true;
            }
        });
    }
    
    renderEvents(filteredEvents, 'eventsContainer', true);
}

function renderEvents(events, containerId, showStudentActions = false) {
    const container = document.getElementById(containerId);
    const noEvents = document.getElementById('noEvents'); // Assuming 'noEvents' is a generic ID for no events message

    if (!container) {
        console.error(`Container with ID '${containerId}' not found.`);
        return;
    }
    
    if (events.length === 0) {
        container.style.display = 'none';
        if (noEvents) noEvents.style.display = 'block';
        return;
    }
    
    container.style.display = 'grid';
    if (noEvents) noEvents.style.display = 'none';
    
    container.innerHTML = events.map(event => {
        let studentActionsHtml = '';
        if (showStudentActions && currentUser) {
            const isWishlisted = wishlist.some(item => 
                item.eventId === event.id && item.userEmail === currentUser.email
            );
            const isRegistered = registrations.some(reg => 
                reg.eventId === event.id && reg.userEmail === currentUser.email
            );

            studentActionsHtml = `
                <div class="event-header">
                    <h3>${event.title}</h3>
                    <button onclick="event.stopPropagation(); toggleWishlist(${event.id})" class="wishlist-btn ${isWishlisted ? 'wishlisted' : ''}">
                        <span>${isWishlisted ? '❤️' : '🤍'}</span>
                    </button>
                </div>
                <p><strong>Club:</strong> ${event.clubName}</p>
                <p>${event.description.substring(0, 100)}...</p>
                <div class="event-meta">
                    <span class="event-date">${formatDate(event.date)}</span>
                    <span class="event-category">${event.category}</span>
                </div>
                ${isRegistered ? '<span class="registered-badge">Registered</span>' : ''}
            `;
        } else {
            studentActionsHtml = `
                <h3>${event.title}</h3>
                <p>${event.description.substring(0, 100)}...</p>
                <div class="event-meta">
                    <span class="event-date">${formatDate(event.date)}</span>
                    <span class="event-category">${event.category}</span>
                </div>
            `;
        }
            
        return `
            <div class="event-card" onclick="openEventModal(${event.id})">
                <img src="${event.bannerUrl || 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}" alt="${event.title}">
                <div class="event-card-content">
                    ${studentActionsHtml}
                </div>
            </div>
        `;
    }).join('');
}

function toggleWishlist(eventId) {
    const existingIndex = wishlist.findIndex(item => 
        item.eventId === eventId && item.userEmail === currentUser.email
    );
    
    if (existingIndex !== -1) {
        wishlist.splice(existingIndex, 1);
        showNotification('Removed from wishlist', 'success');
    } else {
        wishlist.push({
            eventId: eventId,
            userEmail: currentUser.email,
            addedAt: new Date().toISOString()
        });
        showNotification('Added to wishlist', 'success');
    }
    
    saveWishlist();
    updateStudentStats();
    
    // Refresh the current view
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage === 'student-dashboard.html') {
        loadStudentEvents();
    } else if (currentPage === 'student-coordinator-dashboard.html') {
        renderCoordinatorHome();
        loadWishlistForCoordinator();
    }
}

function registerForEvent(eventId) {
    const event = events.find(e => e.id === eventId);
    if (!event) return;
    
    // Check if already registered
    const isRegistered = registrations.some(reg => 
        reg.eventId === eventId && reg.userEmail === currentUser.email
    );
    
    if (isRegistered) {
        showNotification('You are already registered for this event', 'error');
        return;
    }
    
    // Add registration
    registrations.push({
        eventId: eventId,
        userEmail: currentUser.email,
        registeredAt: new Date().toISOString(),
        eventTitle: event.title
    });
    
    saveRegistrations();
    updateStudentStats();
    showNotification('Successfully registered for event!', 'success');
    
    // Open registration form in new tab
    window.open(event.formLink, '_blank');

    // Refresh history for coordinator if on that page
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage === 'student-coordinator-dashboard.html') {
        loadHistoryForCoordinator();
    }
}

function openEventModal(eventId) {
    const event = events.find(e => e.id === eventId);
    if (!event) return;
    
    const isRegistered = registrations.some(reg => 
        reg.eventId === eventId && reg.userEmail === currentUser.email
    );
    
    const modal = document.getElementById('eventModal');
    const content = document.getElementById('eventModalContent');
    
    content.innerHTML = `
        <div class="event-modal-body">
            <img src="${event.bannerUrl || 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}" alt="${event.title}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 10px; margin-bottom: 20px;">
            <h3>${event.title}</h3>
            <div class="event-details">
                <p><strong>Club:</strong> ${event.clubName}</p>
                <p><strong>Date:</strong> ${formatDate(event.date)} at ${event.time}</p>
                <p><strong>Location:</strong> ${event.location}</p>
                <p><strong>Category:</strong> ${event.category}</p>
                <p><strong>Description:</strong> ${event.description}</p>
            </div>
            <div class="event-actions">
                ${isRegistered ? 
                    '<span class="registered-badge">Already Registered</span>' :
                    `<button onclick="registerForEvent(${event.id})" class="btn-primary">Register for Event</button>`
                }
                <button onclick="toggleWishlist(${event.id})" class="btn-secondary">
                    ${wishlist.some(item => item.eventId === event.id && item.userEmail === currentUser.email) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </button>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

function closeEventModal() {
    document.getElementById('eventModal').style.display = 'none';
}

function closeRegistrationModal() {
    document.getElementById('registrationModal').style.display = 'none';
}

// ==================== COORDINATOR DASHBOARD ====================

function initializeCoordinatorDashboard() {
    loadCoordinatorEvents();
    updateCoordinatorStats();

    // Navigation between sections
    const navHome = document.getElementById('navHome');
    const navMyEvents = document.getElementById('navMyEvents');
    const navCreate = document.getElementById('navCreate');
    const navWishlist = document.getElementById('navWishlist');
    const navHistory = document.getElementById('navHistory');

    if (navHome) navHome.addEventListener('click', e => { e.preventDefault(); showCoordinatorSection('home'); });
    if (navMyEvents) navMyEvents.addEventListener('click', e => { e.preventDefault(); showCoordinatorSection('my-events'); });
    if (navCreate) navCreate.addEventListener('click', e => { e.preventDefault(); showCoordinatorSection('create'); });
    if (navWishlist) navWishlist.addEventListener('click', e => { e.preventDefault(); showCoordinatorSection('wishlist'); });
    if (navHistory) navHistory.addEventListener('click', e => { e.preventDefault(); showCoordinatorSection('history'); });

    // Event form listeners
    const eventForm = document.getElementById('eventForm');
    if (eventForm) {
        eventForm.addEventListener('submit', handleEventSubmit);
    }
    const saveDraftBtn = document.getElementById('saveDraftBtn');
    if (saveDraftBtn) {
        saveDraftBtn.addEventListener('click', saveDraftFromForm);
    }

    // Render coordinator home + wishlist/history
    renderCoordinatorHome();
    loadWishlistForCoordinator();
    loadHistoryForCoordinator();
    showCoordinatorSection('home');
}

function loadCoordinatorEvents() {
    const clubName = getCoordinatorClubName();
    const myEvents = events.filter(event => event.clubName === clubName);
    displayCoordinatorEvents(myEvents);
    updateCoordinatorStats();
}

function updateCoordinatorStats() {
    const clubName = getCoordinatorClubName();
    const myEvents = events.filter(event => event.clubName === clubName);
    const pending = myEvents.filter(event => event.status === 'pending').length;
    const approved = myEvents.filter(event => event.status === 'approved').length;
    const denied = myEvents.filter(event => event.status === 'denied').length;
    
    const totalMyEventsElement = document.getElementById('totalMyEvents');
    const pendingEventsElement = document.getElementById('pendingEvents');
    const approvedEventsElement = document.getElementById('approvedEvents');
    const deniedEventsElement = document.getElementById('deniedEvents');
    
    if (totalMyEventsElement) totalMyEventsElement.textContent = myEvents.length;
    if (pendingEventsElement) pendingEventsElement.textContent = pending;
    if (approvedEventsElement) approvedEventsElement.textContent = approved;
    if (deniedEventsElement) deniedEventsElement.textContent = denied;
}

function filterMyEvents(status) {
    const clubName = getCoordinatorClubName();
    const myEvents = events.filter(event => event.clubName === clubName);
    let filteredEvents = myEvents;
    
    if (status !== 'all') {
        filteredEvents = myEvents.filter(event => event.status === status);
    }
    
    displayCoordinatorEvents(filteredEvents);
    
    // Update active tab
    document.querySelectorAll('#myEventsFilterTabs .filter-tab').forEach(tab => tab.classList.remove('active'));
    // Assuming 'this' refers to the clicked button
    if (event && event.target) {
        event.target.classList.add('active');
    }
}

function displayCoordinatorEvents(events) {
    const container = document.getElementById('myEventsContainer');
    const noEvents = document.getElementById('noMyEvents');
    
    if (events.length === 0) {
        if (container) container.style.display = 'none';
        if (noEvents) noEvents.style.display = 'block';
        return;
    }
    
    if (container) container.style.display = 'grid';
    if (noEvents) noEvents.style.display = 'none';
    
    if (container) {
        container.innerHTML = events.map(event => `
            <div class="event-card">
                <img src="${event.bannerUrl || 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}" alt="${event.title}">
                <div class="event-card-content">
                    <h3>${event.title}</h3>
                    <p><strong>Club:</strong> ${event.clubName}</p>
                    <p>${event.description.substring(0, 100)}...</p>
                    <div class="event-meta">
                        <span class="event-date">${formatDate(event.date)}</span>
                        <span class="event-status ${event.status}">${event.status}</span>
                    </div>
                    ${event.rejectionReason ? `<p class="rejection-reason"><strong>Rejection Reason:</strong> ${event.rejectionReason}</p>` : ''}
                    <div class="event-actions">
                        <button onclick="editEvent(${event.id})" class="btn-secondary">Edit</button>
                        <button onclick="deleteEvent(${event.id})" class="btn-danger">Delete</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function openCreateEventModal() {
    document.getElementById('eventFormTitle').textContent = 'Create New Event';
    document.getElementById('submitBtnText').textContent = 'Submit for Approval';
    document.getElementById('eventForm').reset();
    document.getElementById('eventForm').removeAttribute('data-event-id');
    // Auto-fill club name for coordinator
    const clubInput = document.getElementById('eventClubName');
    if (clubInput) {
        clubInput.value = getCoordinatorClubName();
        clubInput.readOnly = true;
    }
    document.getElementById('eventFormModal').style.display = 'block';
}

function closeEventFormModal() {
    document.getElementById('eventFormModal').style.display = 'none';
}

function handleEventSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const eventId = event.target.dataset.eventId;
    
    const eventData = {
        id: eventId ? parseInt(eventId) : Date.now(),
        title: formData.get('title'),
        category: formData.get('category'),
        date: formData.get('date'),
        time: formData.get('time'),
        location: formData.get('location'),
        description: formData.get('description'),
        bannerUrl: formData.get('bannerUrl'),
        formLink: formData.get('formLink'),
        clubName: formData.get('clubName'),
        coordinator: currentUser.email,
        status: eventId ? (events.find(e => e.id === parseInt(eventId))?.status === 'draft' ? 'pending' : (events.find(e => e.id === parseInt(eventId))?.status || 'pending')) : 'pending',
        createdAt: eventId ? events.find(e => e.id === parseInt(eventId))?.createdAt : new Date().toISOString(),
        rejectionReason: eventId ? events.find(e => e.id === parseInt(eventId))?.rejectionReason : null
    };
    
    if (eventId) {
        // Update existing event
        const index = events.findIndex(e => e.id === parseInt(eventId));
        if (index !== -1) {
            events[index] = eventData;
        }
    } else {
        // Create new event
        events.push(eventData);
    }
    
    saveEvents();
    closeEventFormModal();
    loadCoordinatorEvents();
    renderCoordinatorHome();
    
    showNotification(eventId ? 'Event updated successfully!' : 'Event created successfully! Waiting for faculty approval.', 'success');
}

function editEvent(eventId) {
    const event = events.find(e => e.id === eventId);
    if (!event) return;
    
    document.getElementById('eventFormTitle').textContent = 'Edit Event';
    document.getElementById('submitBtnText').textContent = 'Update Event';
    
    // Populate form
    document.getElementById('eventTitle').value = event.title;
    document.getElementById('eventCategory').value = event.category;
    document.getElementById('eventDate').value = event.date;
    document.getElementById('eventTime').value = event.time;
    document.getElementById('eventLocation').value = event.location;
    document.getElementById('eventDescription').value = event.description;
    document.getElementById('eventBanner').value = event.bannerUrl || '';
    document.getElementById('eventFormLink').value = event.formLink;
    document.getElementById('eventClubName').value = event.clubName;
    
    // Store event ID for update
    document.getElementById('eventForm').dataset.eventId = eventId;
    
    document.getElementById('eventFormModal').style.display = 'block';
}

function deleteEvent(eventId) {
    document.getElementById('deleteModal').style.display = 'block';
    document.getElementById('deleteModal').dataset.eventId = eventId;
}

function closeDeleteModal() {
    document.getElementById('deleteModal').style.display = 'none';
}

function confirmDeleteEvent() {
    const eventId = parseInt(document.getElementById('deleteModal').dataset.eventId);
    events = events.filter(event => event.id !== eventId);
    saveEvents();
    
    closeDeleteModal();
    loadCoordinatorEvents();
    showNotification('Event deleted successfully!', 'success');
}

// ===== Coordinator Home (Explore) =====
function showCoordinatorSection(sectionId) {
    const sections = ['home', 'my-events', 'create', 'wishlist', 'history'];
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = (id === sectionId) ? 'block' : 'none';
    });

    // Highlight nav
    const navIds = {
        'home': 'navHome',
        'my-events': 'navMyEvents',
        'create': 'navCreate',
        'wishlist': 'navWishlist',
        'history': 'navHistory'
    };
    Object.values(navIds).forEach(nid => {
        const link = document.getElementById(nid);
        if (link) link.classList.remove('active');
    });
    const activeLink = document.getElementById(navIds[sectionId]);
    if (activeLink) activeLink.classList.add('active');

    if (sectionId === 'wishlist') loadWishlistForCoordinator();
    if (sectionId === 'history') loadHistoryForCoordinator();
    if (sectionId === 'home') renderCoordinatorHome();
}

function setCoordinatorHomeStatus(status) {
    coordinatorHomeStatus = status;
    // update active tab visuals
    const buttons = document.querySelectorAll('#statusTabs .filter-tab');
    buttons.forEach(btn => btn.classList.remove('active'));
    // Assuming 'this' refers to the clicked button
    if (event && event.target) {
        event.target.classList.add('active');
    }
    renderCoordinatorHome();
}

function setCoordinatorHomeCategory(category) {
    coordinatorHomeCategory = category;
    const buttons = document.querySelectorAll('#categoryTabs .filter-tab');
    buttons.forEach(btn => btn.classList.remove('active'));
    // Assuming 'this' refers to the clicked button
    if (event && event.target) {
        event.target.classList.add('active');
    }
    renderCoordinatorHome();
}

function renderCoordinatorHome() {
    const container = document.getElementById('coordinatorHomeContainer');
    const noEvents = document.getElementById('noHomeEvents');
    if (!container) return;

    const today = new Date();
    let visibleEvents = events.filter(e => e.status === 'approved');

    visibleEvents = visibleEvents.filter(e => {
        const d = new Date(e.date);
        switch (coordinatorHomeStatus) {
            case 'upcoming':
                return d > today;
            case 'ongoing':
                return d.toDateString() === today.toDateString();
            case 'completed':
                return d < today;
            case 'active':
            default:
                return d >= new Date(today.toDateString());
        }
    });

    if (coordinatorHomeCategory) {
        visibleEvents = visibleEvents.filter(e => e.category === coordinatorHomeCategory);
    }

    if (visibleEvents.length === 0) {
        container.style.display = 'none';
        if (noEvents) noEvents.style.display = 'block';
        return;
    }

    container.style.display = 'grid';
    if (noEvents) noEvents.style.display = 'none';
    // Reuse student card renderer to include wishlist hearts
    renderEvents(visibleEvents, 'coordinatorHomeContainer', true);
}

// ===== Drafts =====
function saveDraftFromForm() {
    const form = document.getElementById('eventForm');
    if (!form) return;
    const formData = new FormData(form);
    const eventId = form.dataset.eventId;

    const eventData = {
        id: eventId ? parseInt(eventId) : Date.now(),
        title: formData.get('title'),
        category: formData.get('category'),
        date: formData.get('date'),
        time: formData.get('time'),
        location: formData.get('location'),
        description: formData.get('description'),
        bannerUrl: formData.get('bannerUrl'),
        formLink: formData.get('formLink'),
        clubName: formData.get('clubName'),
        coordinator: currentUser.email,
        status: 'draft',
        createdAt: eventId ? (events.find(e => e.id === parseInt(eventId))?.createdAt || new Date().toISOString()) : new Date().toISOString(),
        rejectionReason: null
    };

    const index = events.findIndex(e => e.id === eventData.id);
    if (index !== -1) {
        events[index] = eventData;
    } else {
        events.push(eventData);
    }
    saveEvents();
    closeEventFormModal();
    loadCoordinatorEvents();
    showNotification('Draft saved locally. You can submit it later for approval.', 'success');
}

function getCoordinatorClubName() {
    // Basic mapping; extend as needed
    if (!currentUser) return '';
    const map = {
        'coordinator@college.edu': 'Tech Club'
    };
    return map[currentUser.email] || 'Tech Club';
}

// ===== Wishlist & History for Coordinator =====
function loadWishlistForCoordinator() {
    const container = document.getElementById('wishlistContainer');
    const noWishlist = document.getElementById('noWishlist');
    if (!container) return;

    const wishIds = wishlist.filter(w => w.userEmail === currentUser.email).map(w => w.eventId);
    const items = events.filter(e => wishIds.includes(e.id) && e.status === 'approved');

    if (items.length === 0) {
        container.style.display = 'none';
        if (noWishlist) noWishlist.style.display = 'block';
        return;
    }
    container.style.display = 'grid';
    if (noWishlist) noWishlist.style.display = 'none';
    renderEvents(items, 'wishlistContainer', true);
}

function loadHistoryForCoordinator() {
    const container = document.getElementById('historyContainer');
    const noHistory = document.getElementById('noHistory');
    if (!container) return;

    const myRegs = registrations.filter(r => r.userEmail === currentUser.email);
    const items = myRegs.map(r => {
        const evt = events.find(e => e.id === r.eventId);
        return evt ? { ...evt, _registeredAt: r.registeredAt } : null;
    }).filter(Boolean);

    if (items.length === 0) {
        container.style.display = 'none';
        if (noHistory) noHistory.style.display = 'block';
        return;
    }
    container.style.display = 'grid';
    if (noHistory) noHistory.style.display = 'none';

    container.innerHTML = items.map(event => `
        <div class="event-card" onclick="openEventModal(${event.id})">
            <img src="${event.bannerUrl || 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}" alt="${event.title}">
            <div class="event-card-content">
                <div class="event-header">
                    <h3>${event.title}</h3>
                </div>
                <p><strong>Club:</strong> ${event.clubName}</p>
                <p>${event.description.substring(0, 100)}...</p>
                <div class="event-meta">
                    <span class="event-date">Participated: ${new Date(event._registeredAt).toLocaleDateString()}</span>
                    <span class="event-category">${event.category}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// ==================== FACULTY DASHBOARD ====================

function initializeFacultyDashboard() {
    loadFacultyRequests();
    updateFacultyStats();
    
    // Add event listeners
    const searchInput = document.getElementById('searchRequests');
    if (searchInput) {
        searchInput.addEventListener('input', searchRequests);
    }

    // Poll backend regularly so faculty dashboard sees new submissions from other tabs/users
    if (!window._campusconnect_faculty_poll) {
        window._campusconnect_faculty_poll = setInterval(() => {
            loadDataFromBackend().then(ok => {
                if (ok) {
                    loadFacultyRequests();
                    updateFacultyStats();
                }
            }).catch(() => {});
        }, 5000);
    }
}

function loadFacultyRequests() {
    displayFacultyRequests(events);
    updateFacultyStats();
}

function updateFacultyStats() {
    const pending = events.filter(event => event.status === 'pending').length;
    const approved = events.filter(event => event.status === 'approved').length;
    const denied = events.filter(event => event.status === 'denied').length;
    
    const pendingRequestsElement = document.getElementById('pendingRequests');
    const approvedRequestsElement = document.getElementById('approvedRequests');
    const deniedRequestsElement = document.getElementById('deniedRequests');
    
    if (pendingRequestsElement) pendingRequestsElement.textContent = pending;
    if (approvedRequestsElement) approvedRequestsElement.textContent = approved;
    if (deniedRequestsElement) deniedRequestsElement.textContent = denied;
}

function filterRequests(status) {
    let filteredEvents = events;
    
    if (status !== 'all') {
        filteredEvents = events.filter(event => event.status === status);
    }
    
    displayFacultyRequests(filteredEvents);
    updateSectionTitle(status);
    
    // Update active tab
    document.querySelectorAll('#facultyFilterTabs .filter-tab').forEach(tab => tab.classList.remove('active'));
    // Assuming 'this' refers to the clicked button
    if (event && event.target) {
        event.target.classList.add('active');
    }
}

function updateSectionTitle(status) {
    const titles = {
        'pending': 'Pending Requests',
        'approved': 'Approved Events',
        'denied': 'Denied Events',
        'all': 'All Events'
    };
    const sectionTitleElement = document.getElementById('sectionTitle');
    if (sectionTitleElement) {
        sectionTitleElement.textContent = titles[status] || 'Events';
    }
}

function searchRequests() {
    const searchTerm = document.getElementById('searchRequests').value.toLowerCase();
    const filteredEvents = events.filter(event => 
        event.title.toLowerCase().includes(searchTerm) ||
        event.description.toLowerCase().includes(searchTerm) ||
        event.coordinator.toLowerCase().includes(searchTerm) ||
        event.clubName.toLowerCase().includes(searchTerm)
    );
    
    displayFacultyRequests(filteredEvents);
}

function displayFacultyRequests(events) {
    const container = document.getElementById('requestsContainer');
    const noRequests = document.getElementById('noRequests');
    
    if (events.length === 0) {
        if (container) container.style.display = 'none';
        if (noRequests) noRequests.style.display = 'block';
        const noRequestsMessageElement = document.getElementById('noRequestsMessage');
        if (noRequestsMessageElement) {
            noRequestsMessageElement.textContent = 'No events found matching your criteria.';
        }
        return;
    }
    
    if (container) container.style.display = 'grid';
    if (noRequests) noRequests.style.display = 'none';
    
    if (container) {
        container.innerHTML = events.map(event => `
            <div class="request-card">
                <div class="request-card-header">
                    <h3>${event.title}</h3>
                    <span class="event-status ${event.status}">${event.status}</span>
                </div>
                <div class="request-card-content">
                    <p><strong>Club:</strong> ${event.clubName}</p>
                    <p><strong>Category:</strong> ${event.category}</p>
                    <p><strong>Date:</strong> ${formatDate(event.date)} at ${event.time}</p>
                    <p><strong>Location:</strong> ${event.location}</p>
                    <p><strong>Coordinator:</strong> ${event.coordinator}</p>
                    <p>${event.description.substring(0, 150)}...</p>
                    ${event.rejectionReason ? `<p class="rejection-reason"><strong>Rejection Reason:</strong> ${event.rejectionReason}</p>` : ''}
                </div>
                <div class="request-card-actions">
                    <button onclick="viewRequestDetails(${event.id})" class="btn-secondary">View Details</button>
                    ${event.status === 'pending' ? `
                        <button onclick="approveEvent(${event.id})" class="btn-success">Approve</button>
                        <button onclick="denyEvent(${event.id})" class="btn-danger">Deny</button>
                    ` : event.status === 'approved' ? `
                        <button onclick="cancelEvent(${event.id})" class="btn-danger">Cancel Event</button>
                    ` : ''}
                </div>
            </div>
        `).join('');
    }
}

function viewRequestDetails(eventId) {
    const event = events.find(e => e.id === eventId);
    if (!event) return;
    
    const modal = document.getElementById('requestModal');
    const content = document.getElementById('requestModalContent');
    const actions = document.getElementById('requestModalActions');
    
    content.innerHTML = `
        <div class="request-details">
            <img src="${event.bannerUrl || 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}" alt="${event.title}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 10px; margin-bottom: 20px;">
            <h3>${event.title}</h3>
            <div class="event-details">
                <p><strong>Club:</strong> ${event.clubName}</p>
                <p><strong>Category:</strong> ${event.category}</p>
                <p><strong>Date:</strong> ${formatDate(event.date)} at ${event.time}</p>
                <p><strong>Location:</strong> ${event.location}</p>
                <p><strong>Coordinator:</strong> ${event.coordinator}</p>
                <p><strong>Status:</strong> <span class="event-status ${event.status}">${event.status}</span></p>
                <p><strong>Description:</strong> ${event.description}</p>
                <p><strong>Registration Form:</strong> <a href="${event.formLink}" target="_blank">${event.formLink}</a></p>
                ${event.rejectionReason ? `<p><strong>Rejection Reason:</strong> ${event.rejectionReason}</p>` : ''}
            </div>
        </div>
    `;
    
    if (event.status === 'pending') {
        actions.innerHTML = `
            <button onclick="approveEvent(${event.id})" class="btn-success">Approve Event</button>
            <button onclick="denyEvent(${event.id})" class="btn-danger">Deny Event</button>
        `;
    } else if (event.status === 'approved') {
        actions.innerHTML = `
            <button onclick="cancelEvent(${event.id})" class="btn-danger">Cancel Event</button>
        `;
    } else {
        actions.innerHTML = '';
    }
    
    modal.style.display = 'block';
}

function closeRequestModal() {
    document.getElementById('requestModal').style.display = 'none';
}

function approveEvent(eventId) {
    const eventIndex = events.findIndex(e => e.id === eventId);
    if (eventIndex !== -1) {
        events[eventIndex].status = 'approved';
        events[eventIndex].rejectionReason = null;
        saveEvents();
        loadFacultyRequests();
        showNotification('Event approved successfully!', 'success');
        closeRequestModal();
    }
}

function denyEvent(eventId) {
    const rejectionReason = prompt('Please provide a reason for rejection:');
    if (rejectionReason === null) return; // User cancelled
    
    if (rejectionReason.trim() === '') {
        showNotification('Please provide a rejection reason', 'error');
        return;
    }
    
    const eventIndex = events.findIndex(e => e.id === eventId);
    if (eventIndex !== -1) {
        events[eventIndex].status = 'denied';
        events[eventIndex].rejectionReason = rejectionReason.trim();
        saveEvents();
        loadFacultyRequests();
        showNotification('Event denied successfully!', 'success');
        closeRequestModal();
    }
}

function cancelEvent(eventId) {
    if (!confirm('Are you sure you want to cancel this approved event?')) return;
    
    const eventIndex = events.findIndex(e => e.id === eventId);
    if (eventIndex !== -1) {
        events[eventIndex].status = 'cancelled';
        saveEvents();
        loadFacultyRequests();
        showNotification('Event cancelled successfully!', 'success');
        closeRequestModal();
    }
}

// ==================== UTILITY FUNCTIONS ====================

function loadPublicEvents() {
    const approvedEvents = events.filter(event => event.status === 'approved').slice(0, 3);
    renderEvents(approvedEvents, 'publicEventsGrid', false);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

function saveEvents() {
    // Persist to PostgreSQL database
    try {
        scheduleSaveToBackend();
    } catch (err) {
        console.error('Error saving events to database', err);
    }
}

function saveWishlist() {
    try {
        scheduleSaveToBackend();
    } catch (err) {
        console.error('Error saving wishlist to database', err);
    }
}

function saveRegistrations() {
    try {
        scheduleSaveToBackend();
    } catch (err) {
        console.error('Error saving registrations to database', err);
    }
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        ${type === 'success' ? 'background: #10b981;' : 'background: #ef4444;'}
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// ==================== EVENT LISTENERS ====================

function initializeEventListeners() {
    // Hamburger menu toggle
    const hamburger = document.getElementById('hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleHamburger);
    }
    
    // Close hamburger when clicking on nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeHamburger);
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        const modals = [
            'eventModal', 'eventFormModal', 'eventDetailsModal', 
            'requestModal', 'decisionModal', 'bulkModal', 
            'deleteModal', 'registrationModal', 'demoModal'
        ];
        
        modals.forEach(modalId => {
            const modal = document.getElementById(modalId);
            if (modal && event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft') {
            prevSlide();
        } else if (event.key === 'ArrowRight') {
            nextSlide();
        } else if (event.key === 'Escape') {
            // Close all modals
            document.querySelectorAll('[id$="Modal"]').forEach(modal => {
                modal.style.display = 'none';
            });
        }
    });
}

function toggleHamburger() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    }
}

function closeHamburger() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
}

// ==================== ADDITIONAL STUDENT FUNCTIONS ====================

function filterEventsByStatus(status) {
    const today = new Date();
    let filteredEvents = events.filter(event => event.status === 'approved');
    
    switch(status) {
        case 'upcoming':
            filteredEvents = filteredEvents.filter(event => new Date(event.date) > today);
            break;
        case 'ongoing':
            filteredEvents = filteredEvents.filter(event => new Date(event.date).toDateString() === today.toDateString());
            break;
        case 'completed':
            filteredEvents = filteredEvents.filter(event => new Date(event.date) < today);
            break;
    }
    
    const sectionTitleElement = document.getElementById('sectionTitle');
    if (sectionTitleElement) {
        sectionTitleElement.textContent = status.charAt(0).toUpperCase() + status.slice(1) + ' Events';
    }
    renderEvents(filteredEvents, 'eventsContainer', true);
    
    // Update active tab
    document.querySelectorAll('#studentFilterTabs .filter-tab').forEach(tab => tab.classList.remove('active'));
    // Assuming 'this' refers to the clicked button
    if (event && event.target) {
        event.target.classList.add('active');
    }
}

function showWishlistedEvents() {
    const wishlistedEventIds = wishlist
        .filter(item => item.userEmail === currentUser.email)
        .map(item => item.eventId);
    
    const wishlistedEvents = events.filter(event => 
        wishlistedEventIds.includes(event.id) && event.status === 'approved'
    );
    
    const sectionTitleElement = document.getElementById('sectionTitle');
    const noEventsMessageElement = document.getElementById('noEventsMessage');
    
    if (sectionTitleElement) sectionTitleElement.textContent = 'Wishlisted Events';
    if (noEventsMessageElement) noEventsMessageElement.textContent = 'You haven\'t added any events to your wishlist yet.';
    renderEvents(wishlistedEvents, 'eventsContainer', true);
    
    // Update active tab
    document.querySelectorAll('#studentFilterTabs .filter-tab').forEach(tab => tab.classList.remove('active'));
    // Assuming 'this' refers to the clicked button
    if (event && event.target) {
        event.target.classList.add('active');
    }
}

function showRegisteredEvents() {
    const registeredEventIds = registrations
        .filter(reg => reg.userEmail === currentUser.email)
        .map(reg => reg.eventId);
    
    const registeredEvents = events.filter(event => 
        registeredEventIds.includes(event.id) && event.status === 'approved'
    );
    
    const sectionTitleElement = document.getElementById('sectionTitle');
    const noEventsMessageElement = document.getElementById('noEventsMessage');
    
    if (sectionTitleElement) sectionTitleElement.textContent = 'Registered Events';
    if (noEventsMessageElement) noEventsMessageElement.textContent = 'You haven\'t registered for any events yet.';
    renderEvents(registeredEvents, 'eventsContainer', true);
    
    // Update active tab
    document.querySelectorAll('#studentFilterTabs .filter-tab').forEach(tab => tab.classList.remove('active'));
    // Assuming 'this' refers to the clicked button
    if (event && event.target) {
        event.target.classList.add('active');
    }
}

function showEventHistory() {
    const registeredEventIds = registrations
        .filter(reg => reg.userEmail === currentUser.email)
        .map(reg => reg.eventId);
    
    const participatedEvents = events.filter(event => 
        registeredEventIds.includes(event.id)
    );
    
    const sectionTitleElement = document.getElementById('sectionTitle');
    const noEventsMessageElement = document.getElementById('noEventsMessage');
    
    if (sectionTitleElement) sectionTitleElement.textContent = 'Event History';
    if (noEventsMessageElement) noEventsMessageElement.textContent = 'You haven\'t participated in any events yet.';
    renderEvents(participatedEvents, 'eventsContainer', true);
    
    // Update active tab
    document.querySelectorAll('#studentFilterTabs .filter-tab').forEach(tab => tab.classList.remove('active'));
    // Assuming 'this' refers to the clicked button
    if (event && event.target) {
        event.target.classList.add('active');
    }
}

// ==================== FACULTY FUNCTIONS ====================

function closeRejectionModal() {
    document.getElementById('rejectionModal').style.display = 'none';
    document.getElementById('rejectionReason').value = '';
}

function confirmRejection() {
    const rejectionReason = document.getElementById('rejectionReason').value.trim();
    if (!rejectionReason) {
        showNotification('Please provide a rejection reason', 'error');
        return;
    }
    
    const eventId = parseInt(document.getElementById('rejectionModal').dataset.eventId);
    const eventIndex = events.findIndex(e => e.id === eventId);
    
    if (eventIndex !== -1) {
        events[eventIndex].status = 'denied';
        events[eventIndex].rejectionReason = rejectionReason;
        saveEvents();
        loadFacultyRequests();
        showNotification('Event denied successfully!', 'success');
        closeRejectionModal();
    }
}

function denyEvent(eventId) {
    document.getElementById('rejectionModal').dataset.eventId = eventId;
    document.getElementById('rejectionModal').style.display = 'block';
}

function cancelEvent(eventId) {
    if (!confirm('Are you sure you want to cancel this approved event?')) return;
    
    const eventIndex = events.findIndex(e => e.id === eventId);
    if (eventIndex !== -1) {
        events[eventIndex].status = 'cancelled';
        saveEvents();
        loadFacultyRequests();
        showNotification('Event cancelled successfully!', 'success');
        closeRequestModal();
    }
}
