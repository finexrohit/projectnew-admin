// Show/hide password for login
document.getElementById('toggleLoginPassword').addEventListener('click', function() {
    const pwd = document.getElementById('password');
    if (pwd.type === 'password') {
        pwd.type = 'text';
        this.textContent = '🙈';
    } else {
        pwd.type = 'password';
        this.textContent = '👁️';
    }
});

// Language switching functionality
let currentLanguage = 'en'; // Default to English

function switchLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'hi' : 'en';
    
    // Update language button text
    const languageBtn = document.getElementById('languageToggle');
    languageBtn.textContent = currentLanguage === 'en' ? '🌐 हिंदी' : '🌐 English';
    
    // Update all elements with language attributes
    const elementsWithLang = document.querySelectorAll('[data-lang-en][data-lang-hi]');
    elementsWithLang.forEach(element => {
        const text = element.getAttribute(`data-lang-${currentLanguage}`);
        if (text) {
            if (element.tagName === 'OPTION') {
                element.textContent = text;
            } else {
                element.textContent = text;
            }
        }
    });
    
    // Update specific messages based on current language
    updateDynamicMessages();
    
    // Save language preference
    localStorage.setItem('preferredLanguage', currentLanguage);
}

function updateDynamicMessages() {
    // Update login message if it exists
    const loginMsg = document.getElementById('loginMessage');
    if (loginMsg.textContent) {
        if (loginMsg.textContent.includes('Invalid')) {
            loginMsg.textContent = currentLanguage === 'en' 
                ? 'Invalid username or password.' 
                : 'अमान्य उपयोगकर्ता नाम या पासवर्ड।';
        }
    }
    
    // Update register message if it exists
    const registerMsg = document.getElementById('registerMessage');
    if (registerMsg.textContent) {
        if (registerMsg.textContent.includes('exists')) {
            registerMsg.textContent = currentLanguage === 'en' 
                ? 'Username already exists.' 
                : 'उपयोगकर्ता नाम पहले से मौजूद है।';
        } else if (registerMsg.textContent.includes('created') || registerMsg.textContent.includes('बना')) {
            registerMsg.textContent = currentLanguage === 'en' 
                ? 'Account created! You can now log in.' 
                : 'खाता बनाया गया! अब आप लॉगिन कर सकते हैं।';
        }
    }
}

// Load saved language preference
function loadLanguagePreference() {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && savedLang !== currentLanguage) {
        switchLanguage();
    }
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    loadLanguagePreference();
    
    // Add event listener to language toggle button
    document.getElementById('languageToggle').addEventListener('click', switchLanguage);
    
    // Add event listener to top-right profile photo
    document.getElementById('topRightProfilePhoto').addEventListener('click', function() {
        document.getElementById('updatePhoto').click();
    });
    
    // Check for existing user session and restore it
    restoreUserSession();
});

// Function to restore user session on page load
function restoreUserSession() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        try {
            const user = JSON.parse(currentUser);
            // Verify the user still exists in the users list
            const users = getUsers();
            const existingUser = users.find(u => u.username === user.username && u.password === user.password);
            
            if (existingUser) {
                // Update user data in case it was modified
                const updatedUser = { ...existingUser };
                localStorage.setItem('currentUser', JSON.stringify(updatedUser));
                // Clear any existing error messages
                document.getElementById('loginMessage').textContent = '';
                document.getElementById('registerMessage').textContent = '';
                showProfile(updatedUser);
            } else {
                // User no longer exists, clear the session
                localStorage.removeItem('currentUser');
            }
        } catch (error) {
            // Invalid JSON in localStorage, clear it
            localStorage.removeItem('currentUser');
        }
    }
}

// Show/hide password for registration
document.getElementById('toggleRegisterPassword').addEventListener('click', function() {
    const pwd = document.getElementById('newPassword');
    if (pwd.type === 'password') {
        pwd.type = 'text';
        this.textContent = '🙈';
    } else {
        pwd.type = 'password';
        this.textContent = '👁️';
    }
});
// Show registration form when button is clicked
document.getElementById('showRegisterBtn').addEventListener('click', function() {
    document.getElementById('registerForm').style.display = 'block';
    this.style.display = 'none';
});

// Hide registration form and show button after successful registration
// Default users for each role
const defaultUsers = [
    // Owners
    { username: 'owner1', password: 'ownerpass1', role: 'owner', name: 'Owner One', gender: 'Male', age: 45, mobile: '9000000001' },
    { username: 'owner2', password: 'ownerpass2', role: 'owner', name: 'Owner Two', gender: 'Female', age: 42, mobile: '9000000002' },
    { username: 'owner3', password: 'ownerpass3', role: 'owner', name: 'Owner Three', gender: 'Male', age: 50, mobile: '9000000003' },
    { username: 'owner4', password: 'ownerpass4', role: 'owner', name: 'Owner Four', gender: 'Female', age: 38, mobile: '9000000004' },
    { username: 'owner5', password: 'ownerpass5', role: 'owner', name: 'Owner Five', gender: 'Other', age: 40, mobile: '9000000005' },
    // Hospitals
    { username: 'hospital1', password: 'hospass1', role: 'hospital', name: 'Hospital One', gender: 'Other', age: 10, mobile: '9111111111' },
    { username: 'hospital2', password: 'hospass2', role: 'hospital', name: 'Hospital Two', gender: 'Other', age: 12, mobile: '9111111112' },
    { username: 'hospital3', password: 'hospass3', role: 'hospital', name: 'Hospital Three', gender: 'Other', age: 8, mobile: '9111111113' },
    { username: 'hospital4', password: 'hospass4', role: 'hospital', name: 'Hospital Four', gender: 'Other', age: 15, mobile: '9111111114' },
    { username: 'hospital5', password: 'hospass5', role: 'hospital', name: 'Hospital Five', gender: 'Other', age: 11, mobile: '9111111115' },
    // Doctors
    { username: 'doctor1', password: 'docpass1', role: 'doctor', name: 'Dr. One', gender: 'Male', age: 35, mobile: '9222222221' },
    { username: 'doctor2', password: 'docpass2', role: 'doctor', name: 'Dr. Two', gender: 'Female', age: 32, mobile: '9222222222' },
    { username: 'doctor3', password: 'docpass3', role: 'doctor', name: 'Dr. Three', gender: 'Male', age: 40, mobile: '9222222223' },
    { username: 'doctor4', password: 'docpass4', role: 'doctor', name: 'Dr. Four', gender: 'Female', age: 29, mobile: '9222222224' },
    { username: 'doctor5', password: 'docpass5', role: 'doctor', name: 'Dr. Five', gender: 'Other', age: 37, mobile: '9222222225' },
    // Health Centers
    { username: 'center1', password: 'centpass1', role: 'healthcenter', name: 'Center One', gender: 'Other', age: 5, mobile: '9333333331' },
    { username: 'center2', password: 'centpass2', role: 'healthcenter', name: 'Center Two', gender: 'Other', age: 7, mobile: '9333333332' },
    { username: 'center3', password: 'centpass3', role: 'healthcenter', name: 'Center Three', gender: 'Other', age: 6, mobile: '9333333333' },
    { username: 'center4', password: 'centpass4', role: 'healthcenter', name: 'Center Four', gender: 'Other', age: 8, mobile: '9333333334' },
    { username: 'center5', password: 'centpass5', role: 'healthcenter', name: 'Center Five', gender: 'Other', age: 9, mobile: '9333333335' },
    // Patients
    { username: 'patient1', password: 'patpass1', role: 'patient', name: 'Patient One', gender: 'Male', age: 25, mobile: '9444444441' },
    { username: 'patient2', password: 'patpass2', role: 'patient', name: 'Patient Two', gender: 'Female', age: 22, mobile: '9444444442' },
    { username: 'patient3', password: 'patpass3', role: 'patient', name: 'Patient Three', gender: 'Male', age: 30, mobile: '9444444443' },
    { username: 'patient4', password: 'patpass4', role: 'patient', name: 'Patient Four', gender: 'Female', age: 28, mobile: '9444444444' },
    { username: 'patient5', password: 'patpass5', role: 'patient', name: 'Patient Five', gender: 'Other', age: 27, mobile: '9444444445' }
];

// Store registered users in localStorage (for demo only)
function getUsers() {
    const users = localStorage.getItem('healthUsers');
    return users ? JSON.parse(users) : defaultUsers;
}
function setUsers(users) {
    localStorage.setItem('healthUsers', JSON.stringify(users));
}


function showProfile(user) {
    document.getElementById('authSection').style.display = 'none';
    document.getElementById('profileSection').style.display = 'block';
    document.getElementById('profileUsername').textContent = user.username;
    document.getElementById('profileRole').textContent = user.role;
    document.getElementById('profileName').textContent = user.name || '';
    document.getElementById('profileGender').textContent = user.gender || '';
    document.getElementById('profileAge').textContent = user.age || '';
    document.getElementById('profileMobile').textContent = user.mobile || '';
    
    // Display profile photo
    const profilePhoto = document.getElementById('profilePhoto');
    const topRightPhoto = document.getElementById('topRightProfilePhoto');
    
    if (user.photo) {
        profilePhoto.src = user.photo;
        topRightPhoto.src = user.photo;
    } else {
        profilePhoto.src = '../logo.png';
        topRightPhoto.src = '../logo.png';
    }
    
    // Show the top-right photo when user is logged in
    topRightPhoto.style.display = 'block';
    // Show admin panel for owner
    if (user.role === 'owner') {
        document.getElementById('adminPanel').style.display = 'block';
    } else {
        document.getElementById('adminPanel').style.display = 'none';
    }

        // Show professional dashboard for all users
        const dash = document.getElementById('dashboardNav');
        const dashMain = document.getElementById('dashboardMain');
        // Sidebar with user info and nav
    const isDoctor = user.role === 'doctor';
    const isPatient = user.role === 'patient';
    const isHealthCenter = user.role === 'healthcenter';
        dash.innerHTML = `
            <div id="dashboardSidebar">
                <div class="sidebar-header">
                    <img id="sidebarProfilePhoto" src="${user.photo || '../logo.png'}" alt="Profile Photo" class="sidebar-logo" style="cursor: pointer;" title="${currentLanguage === 'en' ? 'Click to update photo' : 'फ़ोटो अपडेट करने के लिए क्लिक करें'}">
                    <div style="font-size:1.2em;font-weight:bold;">${user.name || user.username}</div>
                    <div class="user-role">${user.role.charAt(0).toUpperCase() + user.role.slice(1)}</div>
                </div>
                <div class="sidebar-nav">
                    <button id="dashHomeBtn" class="active">🏠 Home</button>
                    <button id="dashProfileBtn">👤 ${currentLanguage === 'en' ? 'Profile' : 'प्रोफ़ाइल'}</button>
                    <button id="dashAboutBtn">ℹ️ ${currentLanguage === 'en' ? 'About Us' : 'हमारे बारे में'}</button>
                    <button id="dashContactBtn">📞 ${currentLanguage === 'en' ? 'Contact Us' : 'हमसे संपर्क करें'}</button>
                    ${isDoctor ? '<button id="dashPatientsBtn">🧑\u200d⚕️ Patients</button>' : ''}
                    ${isHealthCenter ? '<button id="dashInventoryBtn">💊 Medicines</button>' : ''}
                    ${isPatient ? '<button id="dashMyHealthBtn">🗂️ My Health</button>' : ''}
                </div>
                <div class="sidebar-footer">Logged in as ${user.username}</div>
            </div>
        `;
        dash.style.display = 'block';
        dashMain.style.display = 'block';
        dashMain.innerHTML = `<h2>Welcome, ${user.name || user.username}!</h2><p>This is your dashboard. Select an option from the sidebar.</p>`;
        // Navigation actions (single-page updates)
        // Helpers to persist patient health data
        function getHealthData() {
            const raw = localStorage.getItem('healthData');
            try { return raw ? JSON.parse(raw) : {}; } catch { return {}; }
        }
        function setHealthData(data) {
            localStorage.setItem('healthData', JSON.stringify(data));
        }
        // Inventory helpers for health centers
        function getInventoryData() {
            const raw = localStorage.getItem('inventoryData');
            try { return raw ? JSON.parse(raw) : {}; } catch { return {}; }
        }
        function setInventoryData(data) {
            localStorage.setItem('inventoryData', JSON.stringify(data));
        }

        function renderHome() {
            // Hide profile details on home page
            document.getElementById('profileDetails').style.display = 'none';
            // Show admin panel for owners when viewing Home
            if (user.role === 'owner') {
                document.getElementById('adminPanel').style.display = 'block';
            }
            
            if (isPatient) {
                dashMain.innerHTML = `
                    <div class="home-center">
                        <h2>${currentLanguage === 'en' ? 'Welcome' : 'स्वागत है'}, ${user.name || user.username}!</h2>
                        
                        <!-- Patient Action Buttons -->
                        <div style="display: flex; gap: 20px; justify-content: center; margin: 30px 0; flex-wrap: nowrap; align-items: center; overflow-x: auto; padding: 10px;">
                            <button id="locationsBtn" class="patient-action-btn" style="background: #2d6a4f; color: white; border: none; padding: 15px 30px; border-radius: 10px; cursor: pointer; font-size: 16px; font-weight: 500; transition: all 0.3s ease; white-space: nowrap; min-width: 140px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                                📍 ${currentLanguage === 'en' ? 'Locations' : 'स्थान'}
                            </button>
                            <button id="symptomsBtn" class="patient-action-btn" style="background: #40916c; color: white; border: none; padding: 15px 30px; border-radius: 10px; cursor: pointer; font-size: 16px; font-weight: 500; transition: all 0.3s ease; white-space: nowrap; min-width: 140px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                                🩺 ${currentLanguage === 'en' ? 'Symptoms' : 'लक्षण'}
                            </button>
                            <button id="appointmentsBtn" class="patient-action-btn" style="background: #52b788; color: white; border: none; padding: 15px 30px; border-radius: 10px; cursor: pointer; font-size: 16px; font-weight: 500; transition: all 0.3s ease; white-space: nowrap; min-width: 140px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                                📅 ${currentLanguage === 'en' ? 'My Appointments' : 'मेरी अपॉइंटमेंट'}
                            </button>
                            <button id="medicinesBtn" class="patient-action-btn" style="background: #74c69d; color: white; border: none; padding: 15px 30px; border-radius: 10px; cursor: pointer; font-size: 16px; font-weight: 500; transition: all 0.3s ease; white-space: nowrap; min-width: 140px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                                💊 ${currentLanguage === 'en' ? 'Medicines' : 'दवाएं'}
                            </button>
                            <button id="emergencyBtn" class="patient-action-btn" style="background: #d90429; color: white; border: none; padding: 15px 30px; border-radius: 10px; cursor: pointer; font-size: 16px; font-weight: 500; transition: all 0.3s ease; white-space: nowrap; min-width: 140px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                                🚨 ${currentLanguage === 'en' ? 'Emergency' : 'आपातकाल'}
                            </button>
                        </div>
                        
                        <!-- Content Area for Patient Actions -->
                        <div id="patientActionContent" style="margin-top: 30px; min-height: 400px;">
                            <p style="text-align: center; color: #666; font-size: 18px;">${currentLanguage === 'en' ? 'Select an option above to get started' : 'शुरू करने के लिए ऊपर से कोई विकल्प चुनें'}</p>
                        </div>
                    </div>`;
                    
                // Add event listeners for patient action buttons
                addPatientActionListeners();
            } else {
                dashMain.innerHTML = `<div class="home-center">
                    <h2>${currentLanguage === 'en' ? 'Welcome' : 'स्वागत है'}, ${user.name || user.username}!</h2>
                    <p data-lang-en="This is the home page. Use the sidebar to navigate." data-lang-hi="यह होम पेज है। नेविगेट करने के लिए साइडबार का उपयोग करें।">${currentLanguage === 'en' ? 'This is the home page. Use the sidebar to navigate.' : 'यह होम पेज है। नेविगेट करने के लिए साइडबार का उपयोग करें।'}</p>
                </div>`;
            }
        }

        // Patient Action Button Handlers
        function addPatientActionListeners() {
            document.getElementById('locationsBtn').onclick = () => showLocations();
            document.getElementById('symptomsBtn').onclick = () => showSymptoms();
            document.getElementById('appointmentsBtn').onclick = () => showMyAppointments();
            document.getElementById('medicinesBtn').onclick = () => showMyMedicines();
            document.getElementById('emergencyBtn').onclick = () => showEmergencyContacts();
            
            // Add hover effects
            document.querySelectorAll('.patient-action-btn').forEach(btn => {
                btn.onmouseover = () => btn.style.transform = 'translateY(-2px)';
                btn.onmouseout = () => btn.style.transform = 'translateY(0)';
            });
        }

        // Sample data for hospitals, doctors, and symptoms
        const hospitalData = [
            {
                id: 1,
                name: 'City General Hospital',
                location: 'Downtown',
                emergency: '(022) 2001-1001',
                specialties: ['Cardiology', 'Neurology', 'General Medicine', 'Orthopedics'],
                doctors: [
                    { id: 1, name: 'Dr. Smith', specialty: 'Cardiology', available: true },
                    { id: 2, name: 'Dr. Johnson', specialty: 'Neurology', available: false },
                    { id: 3, name: 'Dr. Brown', specialty: 'General Medicine', available: true }
                ]
            },
            {
                id: 2,
                name: 'Metro Medical Center',
                location: 'Uptown',
                emergency: '(022) 2002-2002',
                specialties: ['Dermatology', 'Pediatrics', 'General Medicine', 'Gynecology'],
                doctors: [
                    { id: 4, name: 'Dr. Davis', specialty: 'Dermatology', available: true },
                    { id: 5, name: 'Dr. Wilson', specialty: 'Pediatrics', available: true },
                    { id: 6, name: 'Dr. Taylor', specialty: 'Gynecology', available: false }
                ]
            },
            {
                id: 3,
                name: 'Community Health Hospital',
                location: 'Suburb',
                emergency: '(022) 2003-3003',
                specialties: ['Orthopedics', 'ENT', 'General Medicine', 'Psychiatry'],
                doctors: [
                    { id: 7, name: 'Dr. Anderson', specialty: 'Orthopedics', available: true },
                    { id: 8, name: 'Dr. Thomas', specialty: 'ENT', available: true },
                    { id: 9, name: 'Dr. Jackson', specialty: 'Psychiatry', available: true }
                ]
            }
        ];

        const symptomToSpecialty = {
            'chest_pain': 'Cardiology',
            'headache': 'Neurology',
            'fever': 'General Medicine',
            'skin_rash': 'Dermatology',
            'joint_pain': 'Orthopedics',
            'ear_pain': 'ENT',
            'child_fever': 'Pediatrics',
            'anxiety': 'Psychiatry',
            'women_health': 'Gynecology'
        };

        // Default locations data
        const defaultLocations = [
            { name: 'Mumbai Central', area: 'Central Mumbai', pincode: '400001' },
            { name: 'Delhi NCR', area: 'New Delhi', pincode: '110001' },
            { name: 'Bangalore IT Hub', area: 'Electronic City', pincode: '560100' },
            { name: 'Pune Medical District', area: 'Shivajinagar', pincode: '411005' },
            { name: 'Chennai Health Zone', area: 'Anna Nagar', pincode: '600040' }
        ];

        function showLocations() {
            const content = document.getElementById('patientActionContent');
            content.innerHTML = `
                <h3>${currentLanguage === 'en' ? 'Find Healthcare Near You' : 'अपने पास स्वास्थ्य सेवा खोजें'}</h3>
                
                <!-- Location Input Section -->
                <div style="background: #fff; padding: 25px; border-radius: 12px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); margin: 20px 0;">
                    <h4 style="color: #2d6a4f; margin-bottom: 20px;">📍 ${currentLanguage === 'en' ? 'Set Your Location' : 'अपना स्थान सेट करें'}</h4>
                    
                    <div style="display: grid; gap: 15px; margin-bottom: 20px;">
                        <button onclick="getCurrentLocation()" style="background: linear-gradient(45deg, #2d6a4f, #40916c); color: white; border: none; padding: 15px 25px; border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: 500; transition: all 0.3s ease; box-shadow: 0 3px 6px rgba(0,0,0,0.15);">
                            🎯 ${currentLanguage === 'en' ? 'Use My Current Location' : 'मेरी वर्तमान स्थिति का उपयोग करें'}
                        </button>
                        
                        <div style="display: flex; gap: 10px; align-items: center;">
                            <span style="color: #666; font-weight: 500;">${currentLanguage === 'en' ? 'OR' : 'या'}</span>
                            <div style="flex: 1; height: 1px; background: #e9ecef;"></div>
                        </div>
                        
                        <div style="display: flex; gap: 10px;">
                            <input type="text" id="manualLocation" placeholder="${currentLanguage === 'en' ? 'Enter your area, city or pincode...' : 'अपना क्षेत्र, शहर या पिनकोड दर्ज करें...'}" style="flex: 1; padding: 12px 15px; border: 2px solid #e9ecef; border-radius: 8px; font-size: 16px; transition: border-color 0.3s ease;">
                            <button onclick="searchByManualLocation()" style="background: #40916c; color: white; border: none; padding: 12px 20px; border-radius: 8px; cursor: pointer; font-weight: 500; transition: all 0.3s ease;">
                                🔍 ${currentLanguage === 'en' ? 'Search' : 'खोजें'}
                            </button>
                        </div>
                    </div>
                    
                    <div id="locationStatus" style="padding: 10px; border-radius: 6px; display: none; margin-top: 15px;"></div>
                </div>

                <!-- Default Locations -->
                <div style="background: #fff; padding: 25px; border-radius: 12px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); margin: 20px 0;">
                    <h4 style="color: #2d6a4f; margin-bottom: 20px;">🏙️ ${currentLanguage === 'en' ? 'Popular Locations' : 'लोकप्रिय स्थान'}</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px;">
                        ${defaultLocations.map(location => `
                            <button onclick="selectDefaultLocation('${location.name}', '${location.area}', '${location.pincode}')" style="background: #f8f9fa; border: 2px solid #e9ecef; padding: 15px; border-radius: 10px; cursor: pointer; text-align: left; transition: all 0.3s ease; hover:border-color: #2d6a4f;" onmouseover="this.style.borderColor='#2d6a4f'; this.style.background='#f1f8f4'" onmouseout="this.style.borderColor='#e9ecef'; this.style.background='#f8f9fa'">
                                <div style="font-weight: 600; color: #2d6a4f; margin-bottom: 5px;">${location.name}</div>
                                <div style="font-size: 14px; color: #666; margin-bottom: 3px;">${location.area}</div>
                                <div style="font-size: 12px; color: #999;">📌 ${location.pincode}</div>
                            </button>
                        `).join('')}
                    </div>
                </div>

                <!-- Hospitals in Selected Area -->
                <div id="nearbyHospitals" style="margin-top: 20px;">
                    <div style="text-align: center; color: #666; padding: 40px; font-size: 16px;">
                        ${currentLanguage === 'en' ? 'Select a location above to see nearby hospitals' : 'पास के अस्पतालों को देखने के लिए ऊपर से कोई स्थान चुनें'}
                    </div>
                </div>
            `;
        }

        // Get current location using geolocation API
        function getCurrentLocation() {
            const statusDiv = document.getElementById('locationStatus');
            statusDiv.style.display = 'block';
            statusDiv.style.background = '#fff3cd';
            statusDiv.style.border = '1px solid #ffeaa7';
            statusDiv.style.color = '#856404';
            statusDiv.innerHTML = `🔄 ${currentLanguage === 'en' ? 'Getting your location...' : 'आपका स्थान प्राप्त कर रहे हैं...'}`;

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const latitude = position.coords.latitude;
                        const longitude = position.coords.longitude;
                        
                        statusDiv.style.background = '#d1edff';
                        statusDiv.style.border = '1px solid #74c0fc';
                        statusDiv.style.color = '#0c63e4';
                        statusDiv.innerHTML = `📍 ${currentLanguage === 'en' ? 'Location found! Coordinates: ' + latitude.toFixed(4) + ', ' + longitude.toFixed(4) : 'स्थान मिल गया! निर्देशांक: ' + latitude.toFixed(4) + ', ' + longitude.toFixed(4)}`;
                        
                        // Show the found location and search for hospitals
                        setTimeout(() => {
                            showHospitalsNearLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`, `${currentLanguage === 'en' ? 'Your Current Location' : 'आपकी वर्तमान स्थिति'}`, `Lat: ${latitude.toFixed(4)}, Long: ${longitude.toFixed(4)}`);
                        }, 1500);
                    },
                    (error) => {
                        statusDiv.style.background = '#f8d7da';
                        statusDiv.style.border = '1px solid #f5c6cb';
                        statusDiv.style.color = '#721c24';
                        statusDiv.innerHTML = `❌ ${currentLanguage === 'en' ? 'Unable to get location. Please enter manually.' : 'स्थान प्राप्त नहीं हो सका। कृपया मैन्युअल रूप से दर्ज करें।'}`;
                    }
                );
            } else {
                statusDiv.style.background = '#f8d7da';
                statusDiv.style.border = '1px solid #f5c6cb';
                statusDiv.style.color = '#721c24';
                statusDiv.innerHTML = `❌ ${currentLanguage === 'en' ? 'Geolocation not supported by this browser.' : 'इस ब्राउज़र द्वारा भौगोलिक स्थान समर्थित नहीं है।'}`;
            }
        }

        // Search by manual location input
        function searchByManualLocation() {
            const manualInput = document.getElementById('manualLocation').value.trim();
            const statusDiv = document.getElementById('locationStatus');
            
            if (!manualInput) {
                statusDiv.style.display = 'block';
                statusDiv.style.background = '#f8d7da';
                statusDiv.style.border = '1px solid #f5c6cb';
                statusDiv.style.color = '#721c24';
                statusDiv.innerHTML = `⚠️ ${currentLanguage === 'en' ? 'Please enter a location' : 'कृपया कोई स्थान दर्ज करें'}`;
                return;
            }

            statusDiv.style.display = 'block';
            statusDiv.style.background = '#fff3cd';
            statusDiv.style.border = '1px solid #ffeaa7';
            statusDiv.style.color = '#856404';
            statusDiv.innerHTML = `🔄 ${currentLanguage === 'en' ? 'Searching hospitals in ' + manualInput + '...' : manualInput + ' में अस्पताल खोज रहे हैं...'}`;

            // Simulate search delay and show the searched location
            setTimeout(() => {
                statusDiv.style.background = '#d1edff';
                statusDiv.style.border = '1px solid #74c0fc';
                statusDiv.style.color = '#0c63e4';
                statusDiv.innerHTML = `📍 ${currentLanguage === 'en' ? 'Searched Location: ' + manualInput : 'खोजा गया स्थान: ' + manualInput}`;
                
                showHospitalsNearLocation(manualInput, manualInput, manualInput);
            }, 1000);
        }

        // Select a default location
        function selectDefaultLocation(name, area, pincode) {
            const statusDiv = document.getElementById('locationStatus');
            statusDiv.style.display = 'block';
            statusDiv.style.background = '#d1edff';
            statusDiv.style.border = '1px solid #74c0fc';
            statusDiv.style.color = '#0c63e4';
            statusDiv.innerHTML = `📍 ${currentLanguage === 'en' ? 'Selected Location: ' + name + ', ' + area + ' (' + pincode + ')' : 'चयनित स्थान: ' + name + ', ' + area + ' (' + pincode + ')'}`;

            showHospitalsNearLocation(`${name}, ${area}`, name, `${name}, ${area} - ${pincode}`);
        }

        // Show hospitals near the selected location
        function showHospitalsNearLocation(coordinates, locationName, fullLocationDetails) {
            const hospitalsDiv = document.getElementById('nearbyHospitals');
            hospitalsDiv.innerHTML = `
                <!-- Selected Location Display -->
                <div style="background: linear-gradient(135deg, #e8f5e8, #f1f8f4); padding: 20px; border-radius: 12px; border: 2px solid #d4edda; margin-bottom: 25px; box-shadow: 0 3px 8px rgba(0,0,0,0.1);">
                    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 10px;">
                        <div style="background: #2d6a4f; color: white; padding: 10px; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-size: 18px;">
                            📍
                        </div>
                        <div>
                            <h4 style="margin: 0; color: #2d6a4f; font-size: 18px;">${currentLanguage === 'en' ? 'Your Selected Location' : 'आपका चयनित स्थान'}</h4>
                            <p style="margin: 5px 0 0 0; color: #666; font-size: 16px; font-weight: 500;">${fullLocationDetails}</p>
                        </div>
                    </div>
                    <div style="background: rgba(45, 106, 79, 0.1); padding: 10px; border-radius: 6px; font-size: 14px; color: #2d6a4f;">
                        ✅ ${currentLanguage === 'en' ? 'Showing healthcare facilities near this location' : 'इस स्थान के पास स्वास्थ्य सुविधाएं दिखाई जा रही हैं'}
                    </div>
                </div>

                <h4 style="color: #2d6a4f; margin-bottom: 20px;">🏥 ${currentLanguage === 'en' ? 'Hospitals near ' + locationName : locationName + ' के पास अस्पताल'}</h4>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 20px;">
                    ${hospitalData.map((hospital, index) => {
                        const distance = (Math.random() * 5 + 0.5).toFixed(1); // Random distance for demo
                        const travelTime = Math.ceil(distance * 3); // Approximate travel time in minutes
                        return `
                            <div style="background: #fff; padding: 20px; border-radius: 12px; border: 1px solid #e9ecef; box-shadow: 0 3px 8px rgba(0,0,0,0.1); transition: transform 0.3s ease;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
                                    <h5 style="color: #2d6a4f; margin: 0; font-size: 18px;">${hospital.name}</h5>
                                    <div style="text-align: right;">
                                        <span style="background: #e8f5e8; color: #2d6a4f; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 500; display: block; margin-bottom: 3px;">
                                            📍 ${distance} km
                                        </span>
                                        <span style="background: #fff3cd; color: #856404; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 500;">
                                            🕒 ~${travelTime} min
                                        </span>
                                    </div>
                                </div>
                                <p style="margin: 8px 0; color: #666;"><strong>${currentLanguage === 'en' ? 'Address:' : 'पता:'}</strong> ${hospital.location}</p>
                                <p style="margin: 8px 0; color: #666;"><strong>${currentLanguage === 'en' ? 'Emergency:' : 'आपातकाल:'}</strong> ${hospital.emergency}</p>
                                <p style="margin: 8px 0; color: #666;"><strong>${currentLanguage === 'en' ? 'Specialties:' : 'विशेषताएं:'}</strong></p>
                                <div style="display: flex; flex-wrap: wrap; gap: 5px; margin: 10px 0;">
                                    ${hospital.specialties.map(spec => `
                                        <span style="background: #f1f8f4; color: #2d6a4f; padding: 3px 8px; border-radius: 4px; font-size: 12px; border: 1px solid #d4edda;">
                                            ${spec}
                                        </span>
                                    `).join('')}
                                </div>
                                <div style="display: flex; gap: 10px; margin-top: 15px;">
                                    <button onclick="showHospitalDoctors(${hospital.id})" style="background: #2d6a4f; color: white; border: none; padding: 10px 16px; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: 500; transition: all 0.3s ease;">
                                        👨‍⚕️ ${currentLanguage === 'en' ? 'View Doctors' : 'डॉक्टर देखें'}
                                    </button>
                                    <button onclick="callEmergency('${hospital.emergency}')" style="background: #dc3545; color: white; border: none; padding: 10px 16px; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: 500; transition: all 0.3s ease;">
                                        📞 ${currentLanguage === 'en' ? 'Call' : 'कॉल करें'}
                                    </button>
                                    <button onclick="getDirections('${hospital.name}', '${hospital.location}')" style="background: #17a2b8; color: white; border: none; padding: 10px 16px; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: 500; transition: all 0.3s ease;">
                                        🗺️ ${currentLanguage === 'en' ? 'Directions' : 'दिशा'}
                                    </button>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
        }

        function showSymptoms() {
            const content = document.getElementById('patientActionContent');
            content.innerHTML = `
                <h3>${currentLanguage === 'en' ? 'Select Your Symptoms' : 'अपने लक्षण चुनें'}</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; margin-top: 20px;">
                    <button onclick="findHospitalsBySymptom('chest_pain')" class="symptom-btn" style="background: #fff; border: 2px solid #2d6a4f; padding: 15px; border-radius: 10px; cursor: pointer; transition: all 0.3s ease;">
                        💓 ${currentLanguage === 'en' ? 'Chest Pain' : 'सीने में दर्द'}
                    </button>
                    <button onclick="findHospitalsBySymptom('headache')" class="symptom-btn" style="background: #fff; border: 2px solid #2d6a4f; padding: 15px; border-radius: 10px; cursor: pointer; transition: all 0.3s ease;">
                        🤕 ${currentLanguage === 'en' ? 'Headache' : 'सिरदर्द'}
                    </button>
                    <button onclick="findHospitalsBySymptom('fever')" class="symptom-btn" style="background: #fff; border: 2px solid #2d6a4f; padding: 15px; border-radius: 10px; cursor: pointer; transition: all 0.3s ease;">
                        🌡️ ${currentLanguage === 'en' ? 'Fever' : 'बुखार'}
                    </button>
                    <button onclick="findHospitalsBySymptom('skin_rash')" class="symptom-btn" style="background: #fff; border: 2px solid #2d6a4f; padding: 15px; border-radius: 10px; cursor: pointer; transition: all 0.3s ease;">
                        🔴 ${currentLanguage === 'en' ? 'Skin Rash' : 'त्वचा पर चकत्ते'}
                    </button>
                    <button onclick="findHospitalsBySymptom('joint_pain')" class="symptom-btn" style="background: #fff; border: 2px solid #2d6a4f; padding: 15px; border-radius: 10px; cursor: pointer; transition: all 0.3s ease;">
                        🦴 ${currentLanguage === 'en' ? 'Joint Pain' : 'जोड़ों का दर्द'}
                    </button>
                    <button onclick="findHospitalsBySymptom('ear_pain')" class="symptom-btn" style="background: #fff; border: 2px solid #2d6a4f; padding: 15px; border-radius: 10px; cursor: pointer; transition: all 0.3s ease;">
                        👂 ${currentLanguage === 'en' ? 'Ear Pain' : 'कान का दर्द'}
                    </button>
                    <button onclick="findHospitalsBySymptom('child_fever')" class="symptom-btn" style="background: #fff; border: 2px solid #2d6a4f; padding: 15px; border-radius: 10px; cursor: pointer; transition: all 0.3s ease;">
                        👶 ${currentLanguage === 'en' ? 'Child Health' : 'बच्चों का स्वास्थ्य'}
                    </button>
                    <button onclick="findHospitalsBySymptom('anxiety')" class="symptom-btn" style="background: #fff; border: 2px solid #2d6a4f; padding: 15px; border-radius: 10px; cursor: pointer; transition: all 0.3s ease;">
                        🧠 ${currentLanguage === 'en' ? 'Mental Health' : 'मानसिक स्वास्थ्य'}
                    </button>
                    <button onclick="findHospitalsBySymptom('women_health')" class="symptom-btn" style="background: #fff; border: 2px solid #2d6a4f; padding: 15px; border-radius: 10px; cursor: pointer; transition: all 0.3s ease;">
                        👩 ${currentLanguage === 'en' ? 'Women Health' : 'महिला स्वास्थ्य'}
                    </button>
                </div>
                <style>
                    .symptom-btn:hover {
                        background: #2d6a4f !important;
                        color: white !important;
                        transform: translateY(-2px);
                        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                    }
                </style>
            `;
        }

        function findHospitalsBySymptom(symptom) {
            const specialty = symptomToSpecialty[symptom];
            const suitableHospitals = hospitalData.filter(hospital => 
                hospital.specialties.includes(specialty)
            );
            
            const content = document.getElementById('patientActionContent');
            content.innerHTML = `
                <div style="margin-bottom: 20px;">
                    <button onclick="showSymptoms()" style="background: #6c757d; color: white; border: none; padding: 8px 16px; border-radius: 5px; cursor: pointer;">
                        ← ${currentLanguage === 'en' ? 'Back to Symptoms' : 'लक्षणों पर वापस जाएं'}
                    </button>
                </div>
                <h3>${currentLanguage === 'en' ? 'Hospitals for' : 'के लिए अस्पताल'} ${specialty}</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-top: 20px;">
                    ${suitableHospitals.map(hospital => `
                        <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; border: 1px solid #e9ecef;">
                            <h4 style="color: #2d6a4f; margin-bottom: 10px;">🏥 ${hospital.name}</h4>
                            <p><strong>${currentLanguage === 'en' ? 'Location:' : 'स्थान:'}</strong> ${hospital.location}</p>
                            <p><strong>${currentLanguage === 'en' ? 'Specialty:' : 'विशेषता:'}</strong> ${specialty}</p>
                            <p><strong>${currentLanguage === 'en' ? 'Available Doctors:' : 'उपलब्ध डॉक्टर:'}</strong> ${hospital.doctors.filter(doc => doc.specialty === specialty && doc.available).length}</p>
                            <button onclick="showHospitalDoctors(${hospital.id}, '${specialty}')" style="background: #2d6a4f; color: white; border: none; padding: 8px 16px; border-radius: 5px; cursor: pointer;">
                                ${currentLanguage === 'en' ? 'View Doctors' : 'डॉक्टर देखें'}
                            </button>
                        </div>
                    `).join('')}
                </div>
                ${suitableHospitals.length === 0 ? `<p style="text-align: center; color: #666; margin-top: 50px;">${currentLanguage === 'en' ? 'No hospitals found for this specialty.' : 'इस विशेषता के लिए कोई अस्पताल नहीं मिला।'}</p>` : ''}
            `;
        }

        function showHospitalDoctors(hospitalId, filterSpecialty = null) {
            const hospital = hospitalData.find(h => h.id === hospitalId);
            if (!hospital) return;
            
            let doctors = hospital.doctors;
            if (filterSpecialty) {
                doctors = doctors.filter(doc => doc.specialty === filterSpecialty);
            }
            
            const content = document.getElementById('patientActionContent');
            content.innerHTML = `
                <div style="margin-bottom: 20px;">
                    <button onclick="showLocations()" style="background: #6c757d; color: white; border: none; padding: 8px 16px; border-radius: 5px; cursor: pointer;">
                        ← ${currentLanguage === 'en' ? 'Back to Hospitals' : 'अस्पतालों पर वापस जाएं'}
                    </button>
                </div>
                <h3>${currentLanguage === 'en' ? 'Doctors at' : 'डॉक्टर'} ${hospital.name}</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-top: 20px;">
                    ${doctors.map(doctor => `
                        <div style="background: #fff; padding: 20px; border-radius: 10px; border: 1px solid #e9ecef; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                            <h4 style="color: #2d6a4f; margin-bottom: 10px;">👨‍⚕️ ${doctor.name}</h4>
                            <p><strong>${currentLanguage === 'en' ? 'Specialty:' : 'विशेषता:'}</strong> ${doctor.specialty}</p>
                            <p><strong>${currentLanguage === 'en' ? 'Status:' : 'स्थिति:'}</strong> 
                                <span style="color: ${doctor.available ? '#28a745' : '#dc3545'};">
                                    ${doctor.available ? 
                                        (currentLanguage === 'en' ? '✅ Available' : '✅ उपलब्ध') : 
                                        (currentLanguage === 'en' ? '❌ Busy' : '❌ व्यस्त')
                                    }
                                </span>
                            </p>
                            <button onclick="bookAppointment(${hospitalId}, ${doctor.id})" 
                                    style="background: ${doctor.available ? '#2d6a4f' : '#6c757d'}; 
                                           color: white; border: none; padding: 10px 20px; 
                                           border-radius: 5px; cursor: ${doctor.available ? 'pointer' : 'not-allowed'}; 
                                           width: 100%;"
                                    ${!doctor.available ? 'disabled' : ''}>
                                ${doctor.available ? 
                                    (currentLanguage === 'en' ? 'Book Appointment' : 'अपॉइंटमेंट बुक करें') : 
                                    (currentLanguage === 'en' ? 'Currently Unavailable' : 'अभी उपलब्ध नहीं')
                                }
                            </button>
                        </div>
                    `).join('')}
                </div>
            `;
        }
        
    function renderProfile() {
        // Hide admin panel when viewing Profile
        document.getElementById('adminPanel').style.display = 'none';
        
        // Toggle profile details visibility
        const profileDetails = document.getElementById('profileDetails');
        const isVisible = profileDetails.style.display !== 'none';
        
        if (isVisible) {
            // Hide profile if currently visible
            profileDetails.style.display = 'none';
            dashMain.innerHTML = `
                <div class="profile-hidden-state" style="text-align: center; padding: 50px; background: #f8f9fa; border-radius: 12px; margin: 20px 0;">
                    <div style="font-size: 48px; margin-bottom: 20px;">👤</div>
                    <h2 style="color: #2d6a4f; margin-bottom: 15px;">${currentLanguage === 'en' ? 'Profile Hidden' : 'प्रोफ़ाइल छुपा हुआ'}</h2>
                    <p style="color: #666; font-size: 16px; margin-bottom: 20px;">${currentLanguage === 'en' ? 'Your profile information is now hidden for privacy.' : 'आपकी प्रोफ़ाइल जानकारी अब गोपनीयता के लिए छुपी हुई है।'}</p>
                    <button onclick="document.getElementById('dashProfileBtn').click()" style="background: #2d6a4f; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: 500; transition: all 0.3s ease;">
                        👁️ ${currentLanguage === 'en' ? 'Show Profile' : 'प्रोफ़ाइल दिखाएं'}
                    </button>
                </div>
            `;
        } else {
            // Show detailed profile
            profileDetails.style.display = 'block';
            const joinDate = new Date(user.joinDate || Date.now()).toLocaleDateString();
            const accountAge = Math.floor((Date.now() - new Date(user.joinDate || Date.now())) / (1000 * 60 * 60 * 24));
            
            dashMain.innerHTML = `
                <div class="profile-container" style="max-width: 800px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #2d6a4f, #40916c); color: white; padding: 30px; border-radius: 15px 15px 0 0; text-align: center; position: relative;">
                        <div style="position: absolute; top: 15px; right: 15px;">
                            <button onclick="document.getElementById('dashProfileBtn').click()" style="background: rgba(255,255,255,0.2); color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 14px; transition: all 0.3s ease;" onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.2)'">
                                🙈 ${currentLanguage === 'en' ? 'Hide Profile' : 'प्रोफ़ाइल छुपाएं'}
                            </button>
                        </div>
                        <div style="width: 120px; height: 120px; border-radius: 50%; margin: 0 auto 20px; overflow: hidden; border: 5px solid rgba(255,255,255,0.3); box-shadow: 0 8px 16px rgba(0,0,0,0.2);">
                            <img src="${user.photo || '../logo.png'}" alt="Profile Photo" style="width: 100%; height: 100%; object-fit: cover;">
                        </div>
                        <h1 style="margin: 0 0 10px 0; font-size: 2.2em; font-weight: 600;">${user.name || user.username}</h1>
                        <div style="background: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 20px; display: inline-block; font-size: 16px; font-weight: 500;">
                            ${user.role.charAt(0).toUpperCase() + user.role.slice(1)} Account
                        </div>
                    </div>
                    
                    <div style="background: white; padding: 30px; border-radius: 0 0 15px 15px; box-shadow: 0 8px 20px rgba(0,0,0,0.1);">
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 25px;">
                            
                            <!-- Personal Information -->
                            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; border-left: 4px solid #2d6a4f;">
                                <h3 style="color: #2d6a4f; margin: 0 0 15px 0; display: flex; align-items: center; gap: 10px;">
                                    📋 ${currentLanguage === 'en' ? 'Personal Information' : 'व्यक्तिगत जानकारी'}
                                </h3>
                                <div style="space-y: 10px;">
                                    <div style="margin-bottom: 12px;">
                                        <strong style="color: #495057;">${currentLanguage === 'en' ? 'Username:' : 'उपयोगकर्ता नाम:'}</strong>
                                        <span style="color: #666; margin-left: 10px;">${user.username}</span>
                                    </div>
                                    <div style="margin-bottom: 12px;">
                                        <strong style="color: #495057;">${currentLanguage === 'en' ? 'Full Name:' : 'पूरा नाम:'}</strong>
                                        <span style="color: #666; margin-left: 10px;">${user.name || currentLanguage === 'en' ? 'Not provided' : 'प्रदान नहीं किया गया'}</span>
                                    </div>
                                    <div style="margin-bottom: 12px;">
                                        <strong style="color: #495057;">${currentLanguage === 'en' ? 'Account Type:' : 'खाता प्रकार:'}</strong>
                                        <span style="color: #2d6a4f; margin-left: 10px; font-weight: 500;">${user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Account Details -->
                            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; border-left: 4px solid #40916c;">
                                <h3 style="color: #40916c; margin: 0 0 15px 0; display: flex; align-items: center; gap: 10px;">
                                    🗓️ ${currentLanguage === 'en' ? 'Account Details' : 'खाता विवरण'}
                                </h3>
                                <div style="space-y: 10px;">
                                    <div style="margin-bottom: 12px;">
                                        <strong style="color: #495057;">${currentLanguage === 'en' ? 'Member Since:' : 'सदस्य बने:'}</strong>
                                        <span style="color: #666; margin-left: 10px;">${joinDate}</span>
                                    </div>
                                    <div style="margin-bottom: 12px;">
                                        <strong style="color: #495057;">${currentLanguage === 'en' ? 'Account Age:' : 'खाता आयु:'}</strong>
                                        <span style="color: #666; margin-left: 10px;">${accountAge} ${currentLanguage === 'en' ? 'days' : 'दिन'}</span>
                                    </div>
                                    <div style="margin-bottom: 12px;">
                                        <strong style="color: #495057;">${currentLanguage === 'en' ? 'Status:' : 'स्थिति:'}</strong>
                                        <span style="color: #28a745; margin-left: 10px; font-weight: 500;">✅ ${currentLanguage === 'en' ? 'Active' : 'सक्रिय'}</span>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        
                        <!-- Profile Actions -->
                        <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e9ecef;">
                            <h3 style="color: #2d6a4f; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
                                ⚙️ ${currentLanguage === 'en' ? 'Profile Actions' : 'प्रोफ़ाइल क्रियाएं'}
                            </h3>
                            <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                                <button onclick="document.getElementById('updatePhoto').click()" style="background: #2d6a4f; color: white; border: none; padding: 12px 20px; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 500; transition: all 0.3s ease; display: flex; align-items: center; gap: 8px;">
                                    📸 ${currentLanguage === 'en' ? 'Update Photo' : 'फ़ोटो अपडेट करें'}
                                </button>
                                <button onclick="editProfileInfo()" style="background: #40916c; color: white; border: none; padding: 12px 20px; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 500; transition: all 0.3s ease; display: flex; align-items: center; gap: 8px;">
                                    ✏️ ${currentLanguage === 'en' ? 'Edit Info' : 'जानकारी संपादित करें'}
                                </button>
                                <button onclick="downloadProfileData()" style="background: #17a2b8; color: white; border: none; padding: 12px 20px; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 500; transition: all 0.3s ease; display: flex; align-items: center; gap: 8px;">
                                    💾 ${currentLanguage === 'en' ? 'Download Data' : 'डेटा डाउनलोड करें'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    }
    
    function renderAbout() {
            // Hide profile details and admin panel when viewing About Us
            document.getElementById('profileDetails').style.display = 'none';
            document.getElementById('adminPanel').style.display = 'none';
            dashMain.innerHTML = `<h2 data-lang-en="About Us" data-lang-hi="हमारे बारे में">${currentLanguage === 'en' ? 'About Us' : 'हमारे बारे में'}</h2>
                <p data-lang-en="This health portal connects owners, hospitals, doctors, health centers, and patients in a simple, user-friendly way." data-lang-hi="यह स्वास्थ्य पोर्टल मालिकों, अस्पतालों, डॉक्टरों, स्वास्थ्य केंद्रों और मरीजों को एक सरल, उपयोगकर्ता-अनुकूल तरीके से जोड़ता है।">${currentLanguage === 'en' ? 'This health portal connects owners, hospitals, doctors, health centers, and patients in a simple, user-friendly way.' : 'यह स्वास्थ्य पोर्टल मालिकों, अस्पतालों, डॉक्टरों, स्वास्थ्य केंद्रों और मरीजों को एक सरल, उपयोगकर्ता-अनुकूल तरीके से जोड़ता है।'}</p>`;
    }
    function renderContact() {
            // Hide profile details and admin panel when viewing Contact Us
            document.getElementById('profileDetails').style.display = 'none';
            document.getElementById('adminPanel').style.display = 'none';
            dashMain.innerHTML = `<h2 data-lang-en="Contact Us" data-lang-hi="हमसे संपर्क करें">${currentLanguage === 'en' ? 'Contact Us' : 'हमसे संपर्क करें'}</h2>
                <p data-lang-en="For support, email support@healthportal.com or call 1800-000-0000." data-lang-hi="सहायता के लिए, support@healthportal.com पर ईमेल करें या 1800-000-0000 पर कॉल करें।">${currentLanguage === 'en' ? 'For support, email' : 'सहायता के लिए,'} <a href='mailto:support@healthportal.com'>support@healthportal.com</a> ${currentLanguage === 'en' ? 'or call 1800-000-0000.' : 'पर ईमेल करें या 1800-000-0000 पर कॉल करें।'}</p>`;
        }
        // Patient view for own health
        function renderPatientView() {
            // Hide profile details when viewing Patient health data
            document.getElementById('profileDetails').style.display = 'none';
            document.getElementById('adminPanel').style.display = 'none';
            const store = getHealthData();
            const entry = store[user.username] || { records: [], medicines: [] };
            const uniqueDoctors = Array.from(new Set((entry.medicines || []).map(m => m.doctor).filter(Boolean)));
            dashMain.innerHTML = `
                <h2>🗂️ My Health</h2>
                <div class="dl-card" style="margin:12px 0 18px 0;display:flex;flex-wrap:wrap;gap:10px;align-items:flex-end;">
                    <div>
                        <label for="myDoctorFilter" style="display:block;font-weight:bold;color:#333;">Doctor</label>
                        <select id="myDoctorFilter" style="padding:8px;border:1px solid #b7e4c7;border-radius:6px;min-width:160px;">
                            <option value="all">All</option>
                            ${uniqueDoctors.map(d => `<option value="${d}">${d}</option>`).join('')}
                        </select>
                    </div>
                    <div>
                        <label for="myDateFilter" style="display:block;font-weight:bold;color:#333;">Date</label>
                        <input type="date" id="myDateFilter" style="padding:8px;border:1px solid #b7e4c7;border-radius:6px;" />
                    </div>
                    <div style="flex:1;min-width:220px;">
                        <label for="mySearch" style="display:block;font-weight:bold;color:#333;">Search</label>
                        <input type="text" id="mySearch" placeholder="Search notes or names" style="padding:8px;border:1px solid #b7e4c7;border-radius:6px;width:100%;min-width:200px;">
                    </div>
                    <div>
                        <button id="clearFilters" style="margin-top:22px;">Clear Filters</button>
                    </div>
                </div>
                <div class="dl-card-grid">
                    <div class="dl-card" style="flex:1;min-width:280px;">
                        <h3>📄 Medical Reports</h3>
                        <div id="myRecords"></div>
                    </div>
                    <div class="dl-card" style="flex:1;min-width:280px;">
                        <h3>💊 Medicines</h3>
                        <div id="myMeds"></div>
                    </div>
                </div>
            `;

            function filterAndRender() {
                const doctorFilter = document.getElementById('myDoctorFilter').value;
                const dateFilter = document.getElementById('myDateFilter').value;
                const search = document.getElementById('mySearch').value.toLowerCase();
                const records = entry.records || [];
                const meds = entry.medicines || [];

                const recFiltered = records.filter(r => {
                    const okDoc = doctorFilter === 'all' || r.doctor === doctorFilter;
                    const okDate = !dateFilter || (r.date && r.date.slice(0,10) === dateFilter);
                    const okSearch = !search || (r.name && r.name.toLowerCase().includes(search)) || (r.note && r.note.toLowerCase().includes(search));
                    return okDoc && okDate && okSearch;
                });
                const recHtml = recFiltered.length ? `<ul style="padding-left:18px;">${recFiltered.map(r => `
                    <li>
                        <div><strong>${r.name}</strong> <span style="color:#555;">(${new Date(r.date).toLocaleString()})</span></div>
                        ${r.note ? `<div style='color:#555;'>Note: ${r.note}</div>` : ''}
                        <button onclick="downloadHealthRecord('${user.username}', '${r.id}')" style="margin-top:6px;">Download</button>
                    </li>`).join('')}</ul>` : '<p style="color:#555;">No reports found.</p>';
                document.getElementById('myRecords').innerHTML = recHtml;

                const medsFiltered = meds.filter(m => {
                    const okDoc = doctorFilter === 'all' || m.doctor === doctorFilter;
                    const okDate = !dateFilter || (m.date && m.date === dateFilter);
                    const okSearch = !search || (m.name && m.name.toLowerCase().includes(search)) || (m.dosage && m.dosage.toLowerCase().includes(search));
                    return okDoc && okDate && okSearch;
                });
                const medsHtml = medsFiltered.length ? `<table class="dl-table">
                    <thead><tr><th>Date</th><th>Medicine</th><th>Dosage</th><th>Prescribed By</th></tr></thead>
                    <tbody>
                    ${medsFiltered.map(m => `<tr>
                        <td>${m.date || ''}</td>
                        <td>${m.name}</td>
                        <td>${m.dosage || ''}</td>
                        <td>${m.doctor || ''}</td>
                    </tr>`).join('')}
                    </tbody>
                </table>` : '<p style="color:#555;">No medicines found.</p>';
                document.getElementById('myMeds').innerHTML = medsHtml;
            }

            document.getElementById('myDoctorFilter').addEventListener('change', filterAndRender);
            document.getElementById('myDateFilter').addEventListener('change', filterAndRender);
            document.getElementById('mySearch').addEventListener('input', filterAndRender);
            document.getElementById('clearFilters').addEventListener('click', function(){
                document.getElementById('myDoctorFilter').value = 'all';
                document.getElementById('myDateFilter').value = '';
                document.getElementById('mySearch').value = '';
                filterAndRender();
            });

            filterAndRender();
        }
    function renderDoctorPatients() {
            // Hide profile details when viewing Doctor patients
            document.getElementById('profileDetails').style.display = 'none';
            document.getElementById('adminPanel').style.display = 'none';
            const users = getUsers();
            const patients = users.filter(u => u.role === 'patient');
            if (!patients.length) {
                dashMain.innerHTML = '<h2>Patients</h2><p>No patients available.</p>';
                return;
            }
            const options = patients.map(p => `<option value="${p.username}">${p.name || p.username} (${p.username})</option>`).join('');
            dashMain.innerHTML = `
                <h2>🧑‍⚕️ Patient Records</h2>
                <div style="margin-bottom:16px;">
                    <label for="patientSelect"><strong>Select Patient:</strong></label>
                    <select id="patientSelect">${options}</select>
                </div>
                <div id="patientNameBar" style="margin:8px 0 16px 0;color:#2d6a4f;font-weight:bold;"></div>
                <div class="dl-card-grid">
                    <div class="dl-card" style="flex:1;min-width:280px;">
                        <h3>📄 Upload Health Record</h3>
                        <input type="file" id="recordFile" accept="*/*" />
                        <input type="text" id="recordNote" placeholder="Note (optional)" style="display:block;margin-top:8px;width:100%;max-width:360px;padding:8px;border:1px solid #b7e4c7;border-radius:6px;"/>
                        <button id="uploadRecordBtn" style="margin-top:8px;">Upload</button>
                        <div id="recordsList" style="margin-top:12px;"></div>
                    </div>
                    <div class="dl-card" style="flex:1;min-width:280px;">
                        <h3>💊 Log Medicines</h3>
                        <input type="text" id="medName" placeholder="Medicine name" style="display:block;margin-top:0;width:100%;max-width:360px;padding:8px;border:1px solid #b7e4c7;border-radius:6px;"/>
                        <input type="text" id="medDosage" placeholder="Dosage (e.g., 1 tablet, 2x/day)" style="display:block;margin-top:8px;width:100%;max-width:360px;padding:8px;border:1px solid #b7e4c7;border-radius:6px;"/>
                        <input type="date" id="medDate" style="display:block;margin-top:8px;width:100%;max-width:360px;padding:8px;border:1px solid #b7e4c7;border-radius:6px;"/>
                        <button id="addMedicineBtn" style="margin-top:8px;">Add Medicine</button>
                        <div id="medList" style="margin-top:12px;"></div>
                    </div>
                </div>
            `;

            function updatePatientNameBar(pu) {
                const p = patients.find(x => x.username === pu);
                const name = p ? (p.name || p.username) : pu;
                document.getElementById('patientNameBar').textContent = `Patient: ${name}`;
            }

            function renderLists() {
                const patientU = document.getElementById('patientSelect').value;
                updatePatientNameBar(patientU);
                const store = getHealthData();
                const entry = store[patientU] || { records: [], medicines: [] };
                const myRecords = entry.records.filter(r => r.doctor === user.username);
                const myMeds = entry.medicines.filter(m => m.doctor === user.username);

                const recordsHtml = myRecords.length ? `<ul style="padding-left:18px;">${myRecords.map((r, idx) => `
                    <li>
                        <div><strong>${r.name}</strong> <span style="color:#555;">(${new Date(r.date).toLocaleString()})</span></div>
                        ${r.note ? `<div style='color:#555;'>Note: ${r.note}</div>` : ''}
                        <button onclick="downloadHealthRecord('${patientU}', '${r.id}')" style="margin-top:6px;">Download</button>
                    </li>`).join('')}</ul>` : '<p style="color:#555;">No records yet.</p>';
                document.getElementById('recordsList').innerHTML = `<h4>Uploaded Records</h4>${recordsHtml}`;

                const medsHtml = myMeds.length ? `<table class="dl-table">
                    <thead><tr><th>Date</th><th>Medicine</th><th>Dosage</th></tr></thead>
                    <tbody>
                    ${myMeds.map(m => `<tr>
                        <td>${m.date || ''}</td>
                        <td>${m.name}</td>
                        <td>${m.dosage || ''}</td>
                    </tr>`).join('')}
                    </tbody>
                </table>` : '<p style="color:#555;">No medicines logged yet.</p>';
                document.getElementById('medList').innerHTML = `<h4>Medicine Log</h4>${medsHtml}`;
            }

            document.getElementById('patientSelect').addEventListener('change', renderLists);

            document.getElementById('uploadRecordBtn').addEventListener('click', function() {
                const patientU = document.getElementById('patientSelect').value;
                const fileInput = document.getElementById('recordFile');
                const note = document.getElementById('recordNote').value.trim();
                if (!fileInput.files || !fileInput.files[0]) {
                    alert('Please choose a file to upload.');
                    return;
                }
                const file = fileInput.files[0];
                const reader = new FileReader();
                reader.onload = function(ev) {
                    const dataUrl = ev.target.result;
                    const store = getHealthData();
                    const id = 'rec_' + Date.now();
                    if (!store[patientU]) store[patientU] = { records: [], medicines: [] };
                    store[patientU].records.push({ id, doctor: user.username, patient: patientU, name: file.name, type: file.type, size: file.size, note, date: new Date().toISOString(), dataUrl });
                    setHealthData(store);
                    fileInput.value = '';
                    document.getElementById('recordNote').value = '';
                    renderLists();
                };
                reader.readAsDataURL(file);
            });

            document.getElementById('addMedicineBtn').addEventListener('click', function() {
                const patientU = document.getElementById('patientSelect').value;
                const name = document.getElementById('medName').value.trim();
                const dosage = document.getElementById('medDosage').value.trim();
                const date = document.getElementById('medDate').value;
                if (!name) { alert('Enter medicine name'); return; }
                const store = getHealthData();
                if (!store[patientU]) store[patientU] = { records: [], medicines: [] };
                store[patientU].medicines.push({ id: 'med_'+Date.now(), doctor: user.username, patient: patientU, name, dosage, date, addedAt: new Date().toISOString() });
                setHealthData(store);
                document.getElementById('medName').value = '';
                document.getElementById('medDosage').value = '';
                document.getElementById('medDate').value = '';
                renderLists();
            });

            // Expose downloader globally for inline handlers
            window.downloadHealthRecord = function(patientU, recId) {
                const store = getHealthData();
                const entry = (store[patientU] && store[patientU].records) || [];
                const rec = entry.find(r => r.id === recId);
                if (!rec) return;
                // Convert dataURL to Blob and trigger download
                const link = document.createElement('a');
                link.href = rec.dataUrl;
                link.download = rec.name || 'record';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            };

            // Initial render
            renderLists();
        }
        // Health Center: Medicines inventory management
        function renderHealthCenterInventory() {
            // Hide profile details when viewing Health Center inventory
            document.getElementById('profileDetails').style.display = 'none';
            document.getElementById('adminPanel').style.display = 'none';
            if (!isHealthCenter) return;
            const store = getInventoryData();
            if (!store[user.username]) store[user.username] = { items: [] };
            setInventoryData(store);

            dashMain.innerHTML = `
                <h2>🏥 Medicines Inventory</h2>
                <div class="dl-card-grid" style="margin-bottom:16px;">
                    <div class="dl-card">
                        <h3>➕ Add Medicine</h3>
                        <input type="text" id="invName" placeholder="Medicine name" style="display:block;width:100%;max-width:360px;padding:8px;border:1px solid #b7e4c7;border-radius:6px;"/>
                        <input type="number" id="invStock" placeholder="Stock quantity" style="display:block;margin-top:8px;width:100%;max-width:360px;padding:8px;border:1px solid #b7e4c7;border-radius:6px;"/>
                        <select id="invUnit" style="display:block;margin-top:8px;width:100%;max-width:360px;padding:8px;border:1px solid #b7e4c7;border-radius:6px;">
                            <option value="units">units</option>
                            <option value="tablets">tablets</option>
                            <option value="capsules">capsules</option>
                            <option value="ml">ml</option>
                            <option value="mg">mg</option>
                        </select>
                        <button id="invAddBtn" style="margin-top:10px;">Add</button>
                    </div>
                    <div class="dl-card">
                        <h3>📥 Upload CSV</h3>
                        <p style="margin:0 0 8px;color:#555;">Format: name,stock,unit (header optional)</p>
                        <input type="file" id="invCsv" accept=".csv" />
                        <button id="invUploadBtn" style="margin-top:10px;">Upload</button>
                    </div>
                </div>
                <div class="dl-card" style="margin-top:8px;">
                    <div style="display:flex;gap:12px;align-items:center;justify-content:space-between;margin-bottom:8px;flex-wrap:wrap;">
                        <h3 style="margin:0;">📋 Current Stock</h3>
                        <input type="text" id="invSearch" placeholder="Search medicine" style="padding:8px;border:1px solid #b7e4c7;border-radius:6px;min-width:220px;"/>
                    </div>
                    <div id="invTableWrap"></div>
                </div>
            `;

            function renderInventoryTable() {
                const s = getInventoryData();
                const items = (s[user.username] && s[user.username].items) || [];
                const query = (document.getElementById('invSearch')?.value || '').toLowerCase();
                const filtered = query ? items.filter(it => (it.name||'').toLowerCase().includes(query)) : items;
                const rows = filtered.map(it => `
                    <tr>
                        <td>${it.name}</td>
                        <td>${it.stock}</td>
                        <td>${it.unit || 'units'}</td>
                        <td>${new Date(it.updatedAt).toLocaleString()}</td>
                        <td>
                            <button onclick="hcDecStock('${it.id}')">-1</button>
                            <button onclick="hcIncStock('${it.id}')">+1</button>
                            <button onclick="hcEditItem('${it.id}')">Edit</button>
                            <button onclick="hcDeleteItem('${it.id}')">Delete</button>
                        </td>
                    </tr>`).join('');
                const tableHtml = filtered.length ? `
                    <table class="dl-table">
                        <thead><tr><th>Name</th><th>Stock</th><th>Unit</th><th>Updated</th><th>Actions</th></tr></thead>
                        <tbody>${rows}</tbody>
                    </table>` : '<p style="color:#555;">No medicines added yet.</p>';
                document.getElementById('invTableWrap').innerHTML = tableHtml;
            }

            document.getElementById('invAddBtn').addEventListener('click', function(){
                const name = document.getElementById('invName').value.trim();
                const stock = parseInt(document.getElementById('invStock').value, 10);
                const unit = document.getElementById('invUnit').value;
                if (!name) { alert('Enter medicine name'); return; }
                const s = getInventoryData();
                if (!s[user.username]) s[user.username] = { items: [] };
                s[user.username].items.push({ id: 'inv_'+Date.now(), name, stock: isNaN(stock)?0:stock, unit, updatedAt: new Date().toISOString() });
                setInventoryData(s);
                document.getElementById('invName').value = '';
                document.getElementById('invStock').value = '';
                document.getElementById('invUnit').value = 'units';
                renderInventoryTable();
            });

            document.getElementById('invUploadBtn').addEventListener('click', function(){
                const fileInput = document.getElementById('invCsv');
                if (!fileInput.files || !fileInput.files[0]) { alert('Select a CSV file'); return; }
                const file = fileInput.files[0];
                const reader = new FileReader();
                reader.onload = function(ev){
                    const text = ev.target.result;
                    const lines = text.split(/\r?\n/).filter(l => l.trim());
                    let start = 0;
                    if (lines.length && /name\s*,\s*stock\s*,\s*unit/i.test(lines[0])) start = 1;
                    const s = getInventoryData();
                    if (!s[user.username]) s[user.username] = { items: [] };
                    for (let i = start; i < lines.length; i++) {
                        const parts = lines[i].split(',');
                        const name = (parts[0]||'').trim();
                        const stock = parseInt((parts[1]||'').trim(), 10);
                        const unit = (parts[2]||'units').trim() || 'units';
                        if (!name) continue;
                        s[user.username].items.push({ id: 'inv_'+Date.now()+'_'+i, name, stock: isNaN(stock)?0:stock, unit, updatedAt: new Date().toISOString() });
                    }
                    setInventoryData(s);
                    fileInput.value = '';
                    renderInventoryTable();
                };
                reader.readAsText(file);
            });

            document.getElementById('invSearch').addEventListener('input', renderInventoryTable);

            // Global handlers for inline buttons with closure over current user
            window.hcIncStock = function(id){
                const s = getInventoryData();
                const arr = (s[user.username] && s[user.username].items) || [];
                const it = arr.find(x => x.id === id);
                if (!it) return;
                it.stock = (parseInt(it.stock,10)||0)+1;
                it.updatedAt = new Date().toISOString();
                setInventoryData(s);
                renderInventoryTable();
            };
            window.hcDecStock = function(id){
                const s = getInventoryData();
                const arr = (s[user.username] && s[user.username].items) || [];
                const it = arr.find(x => x.id === id);
                if (!it) return;
                it.stock = Math.max(0,(parseInt(it.stock,10)||0)-1);
                it.updatedAt = new Date().toISOString();
                setInventoryData(s);
                renderInventoryTable();
            };
            window.hcEditItem = function(id){
                const s = getInventoryData();
                const arr = (s[user.username] && s[user.username].items) || [];
                const it = arr.find(x => x.id === id);
                if (!it) return;
                const newName = prompt('Edit name', it.name);
                if (newName === null) return;
                const newStockStr = prompt('Edit stock', String(it.stock));
                if (newStockStr === null) return;
                const newUnit = prompt('Edit unit', it.unit||'units');
                if (newUnit === null) return;
                const newStock = parseInt(newStockStr, 10);
                it.name = newName.trim() || it.name;
                it.stock = isNaN(newStock) ? it.stock : newStock;
                it.unit = (newUnit.trim()||'units');
                it.updatedAt = new Date().toISOString();
                setInventoryData(s);
                renderInventoryTable();
            };
            window.hcDeleteItem = function(id){
                const s = getInventoryData();
                const arr = (s[user.username] && s[user.username].items) || [];
                const idx = arr.findIndex(x => x.id === id);
                if (idx === -1) return;
                if (!confirm('Delete this item?')) return;
                arr.splice(idx,1);
                setInventoryData(s);
                renderInventoryTable();
            };

            renderInventoryTable();
        }
        function setActiveDashBtn(btn) {
            document.querySelectorAll('#dashboardSidebar .sidebar-nav button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        }
        document.getElementById('dashHomeBtn').onclick = function() {
            setActiveDashBtn(this);
            renderHome();
        };
        document.getElementById('dashProfileBtn').onclick = function() {
            setActiveDashBtn(this);
            renderProfile();
        };
        document.getElementById('dashAboutBtn').onclick = function() {
            setActiveDashBtn(this);
            renderAbout();
        };
        document.getElementById('dashContactBtn').onclick = function() {
            setActiveDashBtn(this);
            renderContact();
        };
        
        // Add click handler for sidebar profile photo
        document.getElementById('sidebarProfilePhoto').onclick = function() {
            document.getElementById('updatePhoto').click();
        };
        
        if (isDoctor && document.getElementById('dashPatientsBtn')) {
            document.getElementById('dashPatientsBtn').onclick = function() {
                setActiveDashBtn(this);
                renderDoctorPatients();
            };
        }
        if (isHealthCenter && document.getElementById('dashInventoryBtn')) {
            document.getElementById('dashInventoryBtn').onclick = function() {
                setActiveDashBtn(this);
                renderHealthCenterInventory();
            };
        }
        if (isPatient && document.getElementById('dashMyHealthBtn')) {
            document.getElementById('dashMyHealthBtn').onclick = function() {
                setActiveDashBtn(this);
                renderPatientView();
            };
        }
        renderHome();
}
// Owner: View all accounts
if (document.getElementById('viewAllAccountsBtn')) {
    document.getElementById('viewAllAccountsBtn').addEventListener('click', function() {
        const users = getUsers();
        const filter = document.getElementById('accountTypeFilter').value;
        let filtered = users;
        if (filter !== 'all') {
            filtered = users.filter(u => u.role === filter);
        }
        let html = '<table style="width:100%;border-collapse:collapse;">';
        const headers = currentLanguage === 'en' 
            ? ['Photo', 'Username', 'Password', 'Role', 'Name', 'Gender', 'Age', 'Mobile', 'Action']
            : ['फ़ोटो', 'उपयोगकर्ता नाम', 'पासवर्ड', 'भूमिका', 'नाम', 'लिंग', 'आयु', 'मोबाइल', 'कार्य'];
        html += `<tr style="background:#e9ecef;">${headers.map(h => `<th>${h}</th>`).join('')}</tr>`;
        filtered.forEach((u, idx) => {
            // Find the real index in users array for saving
            const realIdx = users.findIndex(x => x.username === u.username && x.role === u.role);
            const photoSrc = u.photo || '../logo.png';
            html += `<tr id="editRow${realIdx}">
                <td><img src="${photoSrc}" alt="Photo" style="width:40px;height:40px;border-radius:50%;object-fit:cover;"></td>
                <td><input type="text" value="${u.username}" id="editUsername${realIdx}" style="width:90px;"></td>
                <td><input type="text" value="${u.password||''}" id="editPassword${realIdx}" style="width:90px;"></td>
                <td>
                    <select id="editRole${realIdx}">
                        <option value="owner" ${u.role==='owner'?'selected':''}>owner</option>
                        <option value="hospital" ${u.role==='hospital'?'selected':''}>hospital</option>
                        <option value="doctor" ${u.role==='doctor'?'selected':''}>doctor</option>
                        <option value="healthcenter" ${u.role==='healthcenter'?'selected':''}>healthcenter</option>
                        <option value="patient" ${u.role==='patient'?'selected':''}>patient</option>
                    </select>
                </td>
                <td><input type="text" value="${u.name||''}" id="editName${realIdx}" style="width:90px;"></td>
                <td>
                    <select id="editGender${realIdx}">
                        <option value="Male" ${u.gender==='Male'?'selected':''}>Male</option>
                        <option value="Female" ${u.gender==='Female'?'selected':''}>Female</option>
                        <option value="Other" ${u.gender==='Other'?'selected':''}>Other</option>
                    </select>
                </td>
                <td><input type="number" value="${u.age||''}" id="editAge${realIdx}" style="width:60px;"></td>
                <td><input type="text" value="${u.mobile||''}" id="editMobile${realIdx}" style="width:100px;"></td>
                <td><button onclick="saveEdit(${realIdx})">${currentLanguage === 'en' ? 'Save' : 'सेव'}</button></td>
            </tr>`;
        });
        html += '</table>';
        const dataDiv = document.getElementById('allAccountsData');
        dataDiv.innerHTML = html;
        dataDiv.style.display = 'block';
        // Attach saveEdit to window so it can be called from inline onclick
        window.saveEdit = function(idx) {
            const users = getUsers();
            const u = users[idx];
            const oldUsername = u.username;
            
            u.username = document.getElementById('editUsername'+idx).value;
            u.password = document.getElementById('editPassword'+idx).value;
            u.role = document.getElementById('editRole'+idx).value;
            u.name = document.getElementById('editName'+idx).value;
            u.gender = document.getElementById('editGender'+idx).value;
            u.age = document.getElementById('editAge'+idx).value;
            u.mobile = document.getElementById('editMobile'+idx).value;
            setUsers(users);
            
            // Update current user session if the edited user is currently logged in
            const currentUser = localStorage.getItem('currentUser');
            if (currentUser) {
                try {
                    const currentUserData = JSON.parse(currentUser);
                    if (currentUserData.username === oldUsername) {
                        // Update the current user session with new data
                        localStorage.setItem('currentUser', JSON.stringify(u));
                        // Refresh the profile display with updated information
                        showProfile(u);
                    }
                } catch (error) {
                    // Handle JSON parsing error
                    console.error('Error updating current user session:', error);
                }
            }
            
            alert(currentLanguage === 'en' ? 'Account updated!' : 'खाता अपडेट हो गया!');
        }
    });
}

function logout() {
    document.getElementById('profileSection').style.display = 'none';
    document.getElementById('authSection').style.display = 'block';
    document.getElementById('loginForm').reset();
    document.getElementById('loginMessage').textContent = '';
    document.getElementById('dashboardNav').style.display = 'none';
    document.getElementById('dashboardMain').style.display = 'none';
    document.getElementById('topRightProfilePhoto').style.display = 'none';
    localStorage.removeItem('currentUser');
}

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const users = getUsers();
    const user = users.find(u => u.username === username && u.password === password);
    const msg = document.getElementById('loginMessage');
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        showProfile(user);
    } else {
        msg.style.color = '#d90429';
        msg.textContent = currentLanguage === 'en' 
            ? 'Invalid username or password.' 
            : 'अमान्य उपयोगकर्ता नाम या पासवर्ड।';
    }
});

document.getElementById('logoutBtn').addEventListener('click', logout);

// Photo update functionality
document.getElementById('updatePhotoBtn').addEventListener('click', function() {
    document.getElementById('updatePhoto').click();
});

document.getElementById('updatePhoto').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const photoData = event.target.result;
            
            // Update the current user's photo
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (currentUser) {
                let users = getUsers();
                const userIndex = users.findIndex(u => u.username === currentUser.username);
                if (userIndex !== -1) {
                    users[userIndex].photo = photoData;
                    setUsers(users);
                    
                    // Update current user data
                    currentUser.photo = photoData;
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                    
                    // Update the displayed photos
                    document.getElementById('profilePhoto').src = photoData;
                    // Update sidebar photo if it exists
                    const sidebarPhoto = document.getElementById('sidebarProfilePhoto');
                    if (sidebarPhoto) {
                        sidebarPhoto.src = photoData;
                    }
                    // Update top-right photo
                    document.getElementById('topRightProfilePhoto').src = photoData;
                }
            }
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;
    const newName = document.getElementById('newName').value;
    const newGender = document.getElementById('newGender').value;
    const newAge = document.getElementById('newAge').value;
    const newMobile = document.getElementById('newMobile').value;
    const newRole = document.getElementById('newRole').value;
    const newPhotoFile = document.getElementById('newPhoto').files[0];
    
    let users = getUsers();
    const exists = users.some(u => u.username === newUsername);
    const msg = document.getElementById('registerMessage');
    
    if (exists) {
        msg.style.color = '#d90429';
        msg.textContent = currentLanguage === 'en' 
            ? 'Username already exists.' 
            : 'उपयोगकर्ता नाम पहले से मौजूद है।';
    } else {
        // Handle photo upload
        let photoData = null;
        if (newPhotoFile) {
            const reader = new FileReader();
            reader.onload = function(event) {
                photoData = event.target.result;
                saveNewUser();
            };
            reader.readAsDataURL(newPhotoFile);
        } else {
            saveNewUser();
        }
        
        function saveNewUser() {
            users.push({
                username: newUsername,
                password: newPassword,
                role: newRole,
                name: newName,
                gender: newGender,
                age: newAge,
                mobile: newMobile,
                photo: photoData
            });
            setUsers(users);
            msg.style.color = '#2d6a4f';
            msg.textContent = currentLanguage === 'en' 
                ? 'Account created! You can now log in.' 
                : 'खाता बनाया गया! अब आप लॉगिन कर सकते हैं।';
            document.getElementById('registerForm').reset();
            document.getElementById('registerForm').style.display = 'none';
            document.getElementById('showRegisterBtn').style.display = 'inline-block';
        }
    }
});

// Global functions for patient appointment system
window.showHospitalDoctors = function(hospitalId, filterSpecialty = null) {
    const hospital = hospitalData.find(h => h.id === hospitalId);
    if (!hospital) return;
    
    let doctors = hospital.doctors;
    if (filterSpecialty) {
        doctors = doctors.filter(doc => doc.specialty === filterSpecialty);
    }
    
    const content = document.getElementById('patientActionContent');
    content.innerHTML = `
        <div style="margin-bottom: 20px;">
            <button onclick="showLocations()" style="background: #6c757d; color: white; border: none; padding: 8px 16px; border-radius: 5px; cursor: pointer;">
                ← ${currentLanguage === 'en' ? 'Back to Hospitals' : 'अस्पतालों पर वापस जाएं'}
            </button>
        </div>
        <h3>${currentLanguage === 'en' ? 'Doctors at' : 'डॉक्टर'} ${hospital.name}</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-top: 20px;">
            ${doctors.map(doctor => `
                <div style="background: #fff; padding: 20px; border-radius: 10px; border: 1px solid #e9ecef; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <h4 style="color: #2d6a4f; margin-bottom: 10px;">👨‍⚕️ ${doctor.name}</h4>
                    <p><strong>${currentLanguage === 'en' ? 'Specialty:' : 'विशेषता:'}</strong> ${doctor.specialty}</p>
                    <p><strong>${currentLanguage === 'en' ? 'Status:' : 'स्थिति:'}</strong> 
                        <span style="color: ${doctor.available ? '#28a745' : '#dc3545'};">
                            ${doctor.available ? 
                                (currentLanguage === 'en' ? '✅ Available' : '✅ उपलब्ध') : 
                                (currentLanguage === 'en' ? '❌ Busy' : '❌ व्यस्त')
                            }
                        </span>
                    </p>
                    <button onclick="bookAppointment(${hospitalId}, ${doctor.id})" 
                            style="background: ${doctor.available ? '#2d6a4f' : '#6c757d'}; 
                                   color: white; border: none; padding: 10px 20px; 
                                   border-radius: 5px; cursor: ${doctor.available ? 'pointer' : 'not-allowed'}; 
                                   width: 100%;"
                            ${!doctor.available ? 'disabled' : ''}>
                        ${doctor.available ? 
                            (currentLanguage === 'en' ? 'Book Appointment' : 'अपॉइंटमेंट बुक करें') : 
                            (currentLanguage === 'en' ? 'Currently Unavailable' : 'अभी उपलब्ध नहीं')
                        }
                    </button>
                </div>
            `).join('')}
        </div>
    `;
};

window.findHospitalsBySymptom = function(symptom) {
    const specialty = symptomToSpecialty[symptom];
    const suitableHospitals = hospitalData.filter(hospital => 
        hospital.specialties.includes(specialty)
    );
    
    const content = document.getElementById('patientActionContent');
    content.innerHTML = `
        <div style="margin-bottom: 20px;">
            <button onclick="showSymptoms()" style="background: #6c757d; color: white; border: none; padding: 8px 16px; border-radius: 5px; cursor: pointer;">
                ← ${currentLanguage === 'en' ? 'Back to Symptoms' : 'लक्षणों पर वापस जाएं'}
            </button>
        </div>
        <h3>${currentLanguage === 'en' ? 'Hospitals for' : 'के लिए अस्पताल'} ${specialty}</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-top: 20px;">
            ${suitableHospitals.map(hospital => `
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; border: 1px solid #e9ecef;">
                    <h4 style="color: #2d6a4f; margin-bottom: 10px;">🏥 ${hospital.name}</h4>
                    <p><strong>${currentLanguage === 'en' ? 'Location:' : 'स्थान:'}</strong> ${hospital.location}</p>
                    <p><strong>${currentLanguage === 'en' ? 'Specialty:' : 'विशेषता:'}</strong> ${specialty}</p>
                    <p><strong>${currentLanguage === 'en' ? 'Available Doctors:' : 'उपलब्ध डॉक्टर:'}</strong> ${hospital.doctors.filter(doc => doc.specialty === specialty && doc.available).length}</p>
                    <button onclick="showHospitalDoctors(${hospital.id}, '${specialty}')" style="background: #2d6a4f; color: white; border: none; padding: 8px 16px; border-radius: 5px; cursor: pointer;">
                        ${currentLanguage === 'en' ? 'View Doctors' : 'डॉक्टर देखें'}
                    </button>
                </div>
            `).join('')}
        </div>
        ${suitableHospitals.length === 0 ? `<p style="text-align: center; color: #666; margin-top: 50px;">${currentLanguage === 'en' ? 'No hospitals found for this specialty.' : 'इस विशेषता के लिए कोई अस्पताल नहीं मिला।'}</p>` : ''}
    `;
};

window.bookAppointment = function(hospitalId, doctorId) {
    const hospital = hospitalData.find(h => h.id === hospitalId);
    const doctor = hospital.doctors.find(d => d.id === doctorId);
    
    if (!doctor.available) {
        alert(currentLanguage === 'en' ? 'This doctor is currently not available.' : 'यह डॉक्टर फिलहाल उपलब्ध नहीं है।');
        return;
    }
    
    const content = document.getElementById('patientActionContent');
    content.innerHTML = `
        <div style="margin-bottom: 20px;">
            <button onclick="showHospitalDoctors(${hospitalId})" style="background: #6c757d; color: white; border: none; padding: 8px 16px; border-radius: 5px; cursor: pointer;">
                ← ${currentLanguage === 'en' ? 'Back to Doctors' : 'डॉक्टरों पर वापस जाएं'}
            </button>
        </div>
        <h3>${currentLanguage === 'en' ? 'Book Appointment' : 'अपॉइंटमेंट बुक करें'}</h3>
        <div style="max-width: 500px; margin: 20px auto; background: #fff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <div style="margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                <h4 style="color: #2d6a4f; margin-bottom: 10px;">${currentLanguage === 'en' ? 'Appointment Details' : 'अपॉइंटमेंट विवरण'}</h4>
                <p><strong>${currentLanguage === 'en' ? 'Hospital:' : 'अस्पताल:'}</strong> ${hospital.name}</p>
                <p><strong>${currentLanguage === 'en' ? 'Doctor:' : 'डॉक्टर:'}</strong> ${doctor.name}</p>
                <p><strong>${currentLanguage === 'en' ? 'Specialty:' : 'विशेषता:'}</strong> ${doctor.specialty}</p>
            </div>
            
            <form id="appointmentForm">
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px; font-weight: bold;">${currentLanguage === 'en' ? 'Preferred Date:' : 'पसंदीदा दिनांक:'}</label>
                    <input type="date" id="appointmentDate" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;" min="${new Date().toISOString().split('T')[0]}">
                </div>
                
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px; font-weight: bold;">${currentLanguage === 'en' ? 'Preferred Time:' : 'पसंदीदा समय:'}</label>
                    <select id="appointmentTime" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                        <option value="">${currentLanguage === 'en' ? 'Select Time' : 'समय चुनें'}</option>
                        <option value="09:00">09:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="12:00">12:00 PM</option>
                        <option value="14:00">02:00 PM</option>
                        <option value="15:00">03:00 PM</option>
                        <option value="16:00">04:00 PM</option>
                        <option value="17:00">05:00 PM</option>
                    </select>
                </div>
                
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px; font-weight: bold;">${currentLanguage === 'en' ? 'Reason for Visit:' : 'मुलाकात का कारण:'}</label>
                    <textarea id="appointmentReason" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; min-height: 80px;" placeholder="${currentLanguage === 'en' ? 'Describe your symptoms or reason for appointment...' : 'अपने लक्षण या अपॉइंटमेंट का कारण बताएं...'}"></textarea>
                </div>
                
                <button type="submit" style="background: #2d6a4f; color: white; border: none; padding: 12px 24px; border-radius: 5px; cursor: pointer; width: 100%; font-size: 16px;">
                    ${currentLanguage === 'en' ? 'Confirm Appointment' : 'अपॉइंटमेंट की पुष्टि करें'}
                </button>
            </form>
        </div>
    `;
    
    // Add form submit handler
    document.getElementById('appointmentForm').onsubmit = function(e) {
        e.preventDefault();
        confirmAppointment(hospitalId, doctorId);
    };
};

window.confirmAppointment = function(hospitalId, doctorId) {
    const date = document.getElementById('appointmentDate').value;
    const time = document.getElementById('appointmentTime').value;
    const reason = document.getElementById('appointmentReason').value;
    
    if (!date || !time || !reason) {
        alert(currentLanguage === 'en' ? 'Please fill all fields.' : 'कृपया सभी फ़ील्ड भरें।');
        return;
    }
    
    // Get current user from global scope
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;
    
    // Save appointment to localStorage
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const newAppointment = {
        id: Date.now(),
        patientUsername: currentUser.username,
        hospitalId,
        doctorId,
        date,
        time,
        reason,
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    
    appointments.push(newAppointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));
    
    const hospital = hospitalData.find(h => h.id === hospitalId);
    const doctor = hospital.doctors.find(d => d.id === doctorId);
    
    alert(currentLanguage === 'en' ? 
        `Appointment booked successfully with ${doctor.name} at ${hospital.name} on ${date} at ${time}!` :
        `${doctor.name} के साथ ${hospital.name} में ${date} को ${time} बजे अपॉइंटमेंट सफलतापूर्वक बुक हो गई!`
    );
    
    showMyAppointments();
};

window.cancelAppointment = function(appointmentId) {
    if (confirm(currentLanguage === 'en' ? 'Are you sure you want to cancel this appointment?' : 'क्या आप वाकई इस अपॉइंटमेंट को रद्द करना चाहते हैं?')) {
        const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
        const updatedAppointments = appointments.map(apt => 
            apt.id === appointmentId ? {...apt, status: 'cancelled'} : apt
        );
        localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
        showMyAppointments();
    }
};

function showMyMedicines() {
    const content = document.getElementById('patientActionContent');
    const store = getHealthData();
    const entry = store[user.username] || { records: [], medicines: [] };
    
    content.innerHTML = `
        <h3>${currentLanguage === 'en' ? 'My Medicines' : 'मेरी दवाएं'}</h3>
        ${entry.medicines.length === 0 ? 
            `<p style="text-align: center; color: #666; margin-top: 50px;">${currentLanguage === 'en' ? 'No medicines prescribed yet.' : 'अभी तक कोई दवा निर्धारित नहीं की गई।'}</p>` :
            `<div style="display: grid; gap: 15px; margin-top: 20px;">
                ${entry.medicines.map(med => `
                    <div style="background: #fff; padding: 20px; border-radius: 10px; border: 1px solid #e9ecef; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        <h4 style="color: #2d6a4f; margin-bottom: 10px;">💊 ${med.name}</h4>
                        <p><strong>${currentLanguage === 'en' ? 'Prescribed by:' : 'द्वारा निर्धारित:'}</strong> ${med.doctor}</p>
                        <p><strong>${currentLanguage === 'en' ? 'Dosage:' : 'खुराक:'}</strong> ${med.dosage}</p>
                        <p><strong>${currentLanguage === 'en' ? 'Duration:' : 'अवधि:'}</strong> ${med.duration}</p>
                        <p><strong>${currentLanguage === 'en' ? 'Date:' : 'दिनांक:'}</strong> ${med.date}</p>
                        ${med.notes ? `<p><strong>${currentLanguage === 'en' ? 'Notes:' : 'नोट्स:'}</strong> ${med.notes}</p>` : ''}
                    </div>
                `).join('')}
            </div>`
        }
    `;
}

function showEmergencyContacts() {
    const emergencyContacts = [
        { name: 'Emergency Services', number: '108', type: 'ambulance' },
        { name: 'Police', number: '100', type: 'police' },
        { name: 'Fire Department', number: '101', type: 'fire' },
        { name: 'Women Helpline', number: '1091', type: 'women' },
        { name: 'Child Helpline', number: '1098', type: 'child' }
    ];
    
    const content = document.getElementById('patientActionContent');
    content.innerHTML = `
        <h3>${currentLanguage === 'en' ? 'Emergency Contacts' : 'आपातकालीन संपर्क'}</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-top: 20px;">
            ${emergencyContacts.map(contact => `
                <div style="background: #fff; padding: 20px; border-radius: 10px; border: 1px solid #dc3545; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <h4 style="color: #dc3545; margin-bottom: 10px;">
                        ${contact.type === 'ambulance' ? '🚑' : 
                          contact.type === 'police' ? '👮' : 
                          contact.type === 'fire' ? '🚒' : 
                          contact.type === 'women' ? '👩' : '👶'} 
                        ${contact.name}
                    </h4>
                    <p style="font-size: 24px; font-weight: bold; color: #dc3545; margin: 10px 0;">${contact.number}</p>
                    <button onclick="callEmergency('${contact.number}')" style="background: #dc3545; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; width: 100%;">
                        📞 ${currentLanguage === 'en' ? 'Call Now' : 'अभी कॉल करें'}
                    </button>
                </div>
            `).join('')}
        </div>
        
        <!-- Hospital Emergency Contacts -->
        <h4 style="margin-top: 40px; color: #2d6a4f;">${currentLanguage === 'en' ? 'Hospital Emergency Numbers' : 'अस्पताल आपातकालीन नंबर'}</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; margin-top: 20px;">
            ${hospitalData.map(hospital => `
                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border: 1px solid #e9ecef;">
                    <h5 style="color: #2d6a4f; margin-bottom: 8px;">🏥 ${hospital.name}</h5>
                    <p style="margin: 5px 0;"><strong>${currentLanguage === 'en' ? 'Location:' : 'स्थान:'}</strong> ${hospital.location}</p>
                    <p style="margin: 5px 0;"><strong>${currentLanguage === 'en' ? 'Emergency:' : 'आपातकाल:'}</strong> ${hospital.emergency || '(022) 2000-0000'}</p>
                    <button onclick="callEmergency('${hospital.emergency || '02220000000'}')" style="background: #2d6a4f; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 12px;">
                        📞 ${currentLanguage === 'en' ? 'Call' : 'कॉल'}
                    </button>
                </div>
            `).join('')}
        </div>
    `;
}

window.callEmergency = function(number) {
    if (confirm(currentLanguage === 'en' ? `Call ${number}?` : `${number} पर कॉल करें?`)) {
        window.open(`tel:${number}`, '_self');
    }
};

function showMyAppointments() {
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const myAppointments = appointments.filter(apt => apt.patientUsername === user.username);
    
    const content = document.getElementById('patientActionContent');
    content.innerHTML = `
        <h3>${currentLanguage === 'en' ? 'My Appointments' : 'मेरी अपॉइंटमेंट'}</h3>
        ${myAppointments.length === 0 ? 
            `<p style="text-align: center; color: #666; margin-top: 50px;">${currentLanguage === 'en' ? 'No appointments booked yet.' : 'अभी तक कोई अपॉइंटमेंट बुक नहीं की गई।'}</p>` :
            `<div style="display: grid; gap: 15px; margin-top: 20px;">
                ${myAppointments.map(apt => {
                    const hospital = hospitalData.find(h => h.id === apt.hospitalId);
                    const doctor = hospital?.doctors.find(d => d.id === apt.doctorId);
                    return `
                        <div style="background: #fff; padding: 20px; border-radius: 10px; border: 1px solid #e9ecef; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                            <div style="display: flex; justify-content: between; align-items: start; margin-bottom: 15px;">
                                <div>
                                    <h4 style="color: #2d6a4f; margin-bottom: 5px;">${hospital?.name || 'Unknown Hospital'}</h4>
                                    <p style="margin: 5px 0;"><strong>${currentLanguage === 'en' ? 'Doctor:' : 'डॉक्टर:'}</strong> ${doctor?.name || 'Unknown Doctor'}</p>
                                    <p style="margin: 5px 0;"><strong>${currentLanguage === 'en' ? 'Date:' : 'दिनांक:'}</strong> ${apt.date}</p>
                                    <p style="margin: 5px 0;"><strong>${currentLanguage === 'en' ? 'Time:' : 'समय:'}</strong> ${apt.time}</p>
                                    <p style="margin: 5px 0;"><strong>${currentLanguage === 'en' ? 'Status:' : 'स्थिति:'}</strong> 
                                        <span style="color: ${apt.status === 'confirmed' ? '#28a745' : apt.status === 'cancelled' ? '#dc3545' : '#ffc107'};">
                                            ${apt.status === 'confirmed' ? 
                                                (currentLanguage === 'en' ? 'Confirmed' : 'पुष्ट') : 
                                                apt.status === 'cancelled' ? 
                                                    (currentLanguage === 'en' ? 'Cancelled' : 'रद्द') : 
                                                    (currentLanguage === 'en' ? 'Pending' : 'प्रतीक्षित')
                                            }
                                        </span>
                                    </p>
                                </div>
                                <div>
                                    <span style="background: #f8f9fa; padding: 4px 8px; border-radius: 4px; font-size: 12px; color: #666;">
                                        #${apt.id}
                                    </span>
                                </div>
                            </div>
                            <p><strong>${currentLanguage === 'en' ? 'Reason:' : 'कारण:'}</strong> ${apt.reason}</p>
                            ${apt.status === 'pending' ? 
                                `<button onclick="cancelAppointment(${apt.id})" style="background: #dc3545; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; margin-top: 10px;">
                                    ${currentLanguage === 'en' ? 'Cancel Appointment' : 'अपॉइंटमेंट रद्द करें'}
                                </button>` : ''
                            }
                        </div>
                    `;
                }).join('')}
            </div>`
        }
    `;
}

// Show emergency contacts
window.showEmergency = function() {
    const content = document.getElementById('patientActionContent');
    content.innerHTML = `
        <h3>${currentLanguage === 'en' ? 'Emergency Contacts' : 'आपातकालीन संपर्क'}</h3>
        <div style="display: grid; gap: 20px; margin-top: 20px;">
            <div style="background: #fff; padding: 20px; border-radius: 10px; border: 1px solid #e9ecef; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h4 style="color: #dc3545; margin-bottom: 15px;">🚨 ${currentLanguage === 'en' ? 'Emergency Services' : 'आपातकालीन सेवाएं'}</h4>
                <div style="display: grid; gap: 10px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background: #f8f9fa; border-radius: 5px;">
                        <span><strong>${currentLanguage === 'en' ? 'Police:' : 'पुलिस:'}</strong></span>
                        <button onclick="callEmergency('100')" style="background: #dc3545; color: white; border: none; padding: 5px 15px; border-radius: 4px; cursor: pointer;">100</button>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background: #f8f9fa; border-radius: 5px;">
                        <span><strong>${currentLanguage === 'en' ? 'Fire:' : 'अग्निशमन:'}</strong></span>
                        <button onclick="callEmergency('101')" style="background: #fd7e14; color: white; border: none; padding: 5px 15px; border-radius: 4px; cursor: pointer;">101</button>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background: #f8f9fa; border-radius: 5px;">
                        <span><strong>${currentLanguage === 'en' ? 'Ambulance:' : 'एम्बुलेंस:'}</strong></span>
                        <button onclick="callEmergency('102')" style="background: #28a745; color: white; border: none; padding: 5px 15px; border-radius: 4px; cursor: pointer;">102</button>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background: #f8f9fa; border-radius: 5px;">
                        <span><strong>${currentLanguage === 'en' ? 'Disaster Management:' : 'आपदा प्रबंधन:'}</strong></span>
                        <button onclick="callEmergency('108')" style="background: #6f42c1; color: white; border: none; padding: 5px 15px; border-radius: 4px; cursor: pointer;">108</button>
                    </div>
                </div>
            </div>
            
            <div style="background: #fff; padding: 20px; border-radius: 10px; border: 1px solid #e9ecef; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h4 style="color: #2d6a4f; margin-bottom: 15px;">🏥 ${currentLanguage === 'en' ? 'Hospital Emergency Numbers' : 'अस्पताल आपातकालीन नंबर'}</h4>
                <div style="display: grid; gap: 15px;">
                    ${hospitalData.map(hospital => `
                        <div style="padding: 15px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #2d6a4f;">
                            <h5 style="margin-bottom: 8px; color: #2d6a4f;">${hospital.name}</h5>
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                                <span><strong>${currentLanguage === 'en' ? 'Emergency:' : 'आपातकाल:'}</strong></span>
                                <button onclick="callEmergency('${hospital.emergency}')" style="background: #dc3545; color: white; border: none; padding: 5px 15px; border-radius: 4px; cursor: pointer; font-size: 12px;">${hospital.emergency}</button>
                            </div>
                            <p style="margin: 0; color: #666; font-size: 14px;"><strong>${currentLanguage === 'en' ? 'Location:' : 'स्थान:'}</strong> ${hospital.location}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div style="background: #fff; padding: 20px; border-radius: 10px; border: 1px solid #e9ecef; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h4 style="color: #0066cc; margin-bottom: 15px;">📞 ${currentLanguage === 'en' ? 'Helplines' : 'हेल्पलाइन'}</h4>
                <div style="display: grid; gap: 10px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background: #f8f9fa; border-radius: 5px;">
                        <span><strong>${currentLanguage === 'en' ? 'Women Helpline:' : 'महिला हेल्पलाइन:'}</strong></span>
                        <button onclick="callEmergency('1091')" style="background: #e91e63; color: white; border: none; padding: 5px 15px; border-radius: 4px; cursor: pointer;">1091</button>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background: #f8f9fa; border-radius: 5px;">
                        <span><strong>${currentLanguage === 'en' ? 'Child Helpline:' : 'बाल हेल्पलाइन:'}</strong></span>
                        <button onclick="callEmergency('1098')" style="background: #ff9800; color: white; border: none; padding: 5px 15px; border-radius: 4px; cursor: pointer;">1098</button>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background: #f8f9fa; border-radius: 5px;">
                        <span><strong>${currentLanguage === 'en' ? 'Senior Citizen Helpline:' : 'वरिष्ठ नागरिक हेल्पलाइन:'}</strong></span>
                        <button onclick="callEmergency('14567')" style="background: #795548; color: white; border: none; padding: 5px 15px; border-radius: 4px; cursor: pointer;">14567</button>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background: #f8f9fa; border-radius: 5px;">
                        <span><strong>${currentLanguage === 'en' ? 'Mental Health Helpline:' : 'मानसिक स्वास्थ्य हेल्पलाइन:'}</strong></span>
                        <button onclick="callEmergency('9152987821')" style="background: #673ab7; color: white; border: none; padding: 5px 15px; border-radius: 4px; cursor: pointer;">9152987821</button>
                    </div>
                </div>
            </div>
        </div>
    `;
};

// Get directions to hospital
function getDirections(hospitalName, hospitalAddress) {
    const encodedAddress = encodeURIComponent(`${hospitalName}, ${hospitalAddress}`);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    
    if (confirm(currentLanguage === 'en' ? 
        `Open directions to ${hospitalName} in Google Maps?` : 
        `Google Maps में ${hospitalName} के लिए दिशा खोलें?`)) {
        window.open(mapsUrl, '_blank');
    }
}

// Edit profile information
function editProfileInfo() {
    const newName = prompt(
        currentLanguage === 'en' ? 'Enter your full name:' : 'अपना पूरा नाम दर्ज करें:', 
        loggedInUser.name || ''
    );
    
    if (newName && newName.trim()) {
        loggedInUser.name = newName.trim();
        
        // Update in users array and localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.username === loggedInUser.username);
        if (userIndex !== -1) {
            users[userIndex].name = newName.trim();
            localStorage.setItem('users', JSON.stringify(users));
        }
        
        // Update current session
        localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
        
        // Refresh the profile display
        document.getElementById('dashProfileBtn').click();
        
        alert(currentLanguage === 'en' ? 'Profile updated successfully!' : 'प्रोफ़ाइल सफलतापूर्वक अपडेट किया गया!');
    }
}

// Download profile data
function downloadProfileData() {
    const profileData = {
        username: loggedInUser.username,
        name: loggedInUser.name,
        role: loggedInUser.role,
        joinDate: loggedInUser.joinDate,
        hasPhoto: !!loggedInUser.photo,
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(profileData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${loggedInUser.username}_profile_data.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    alert(currentLanguage === 'en' ? 'Profile data downloaded successfully!' : 'प्रोफ़ाइल डेटा सफलतापूर्वक डाउनलोड किया गया!');
}
