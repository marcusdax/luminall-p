// Luminall PropertyInsight - Main JavaScript
// Initialize all interactive components and animations

document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeStormMap();
    initializePredictionChart();
    initializeInteractiveElements();
});

// Animation System
function initializeAnimations() {
    // Fade in animations for hero elements
    anime({
        targets: '.animate-fade-in',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        delay: anime.stagger(200),
        easing: 'easeOutQuart'
    });

    // Slide in animations for side elements
    anime({
        targets: '.animate-slide-in',
        opacity: [0, 1],
        translateX: [-20, 0],
        duration: 600,
        delay: anime.stagger(100),
        easing: 'easeOutQuart'
    });

    // Card hover animations
    const cards = document.querySelectorAll('.card-hover');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            anime({
                targets: card,
                scale: [1, 1.02],
                duration: 300,
                easing: 'easeOutQuart'
            });
        });

        card.addEventListener('mouseleave', () => {
            anime({
                targets: card,
                scale: [1.02, 1],
                duration: 300,
                easing: 'easeOutQuart'
            });
        });
    });

    // Storm alert pulse animation
    anime({
        targets: '.storm-alert',
        scale: [1, 1.02, 1],
        duration: 2000,
        loop: true,
        easing: 'easeInOutSine'
    });
}

// Storm Map Initialization
function initializeStormMap() {
    // Initialize Leaflet map centered on Dallas area
    const map = L.map('stormMap').setView([32.7767, -96.7970], 10);

    // Add tile layer with custom styling
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18
    }).addTo(map);

    // Mock storm data with property coordinates and damage probabilities
    const stormData = [
        { lat: 32.7767, lng: -96.7970, score: 98, address: "1247 Oak Ridge Dr", risk: 'high' },
        { lat: 32.7831, lng: -96.8067, score: 96, address: "3856 Maple Ave", risk: 'high' },
        { lat: 32.7906, lng: -96.7877, score: 87, address: "2109 Pine Street", risk: 'medium' },
        { lat: 32.7692, lng: -96.8103, score: 92, address: "4567 Elm Drive", risk: 'high' },
        { lat: 32.7956, lng: -96.8023, score: 78, address: "6789 Cedar Lane", risk: 'medium' },
        { lat: 32.7723, lng: -96.7945, score: 94, address: "3210 Birch Street", risk: 'high' },
        { lat: 32.7889, lng: -96.8091, score: 83, address: "8765 Oak Avenue", risk: 'medium' },
        { lat: 32.7745, lng: -96.7989, score: 91, address: "5432 Maple Drive", risk: 'high' },
        { lat: 32.7812, lng: -96.8034, score: 86, address: "9876 Pine Lane", risk: 'medium' },
        { lat: 32.7878, lng: -96.7912, score: 89, address: "1357 Cedar Street", risk: 'medium' }
    ];

    // Add markers for each property
    stormData.forEach(property => {
        const color = property.risk === 'high' ? '#dc2626' : property.risk === 'medium' ? '#d97706' : '#059669';
        
        const marker = L.circleMarker([property.lat, property.lng], {
            radius: 8,
            fillColor: color,
            color: '#ffffff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8
        }).addTo(map);

        // Add popup with property information
        marker.bindPopup(`
            <div class="p-2">
                <h4 class="font-semibold text-sm">${property.address}</h4>
                <p class="text-xs text-gray-600">Dallas, TX</p>
                <div class="mt-2">
                    <span class="text-lg font-bold" style="color: ${color}">${property.score}</span>
                    <span class="text-xs text-gray-500 ml-1">Damage Score</span>
                </div>
                <button class="mt-2 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors">
                    View Details
                </button>
            </div>
        `);

        // Add hover effects
        marker.on('mouseover', function() {
            this.setStyle({ radius: 12, weight: 3 });
        });

        marker.on('mouseout', function() {
            this.setStyle({ radius: 8, weight: 2 });
        });
    });

    // Add storm path visualization
    const stormPath = [
        [32.7600, -96.8200],
        [32.7700, -96.8100],
        [32.7800, -96.8000],
        [32.7850, -96.7950],
        [32.7900, -96.7900]
    ];

    L.polyline(stormPath, {
        color: '#b45309',
        weight: 3,
        opacity: 0.7,
        dashArray: '5, 10'
    }).addTo(map);

    // Add storm impact zone
    const impactZone = L.circle([32.7767, -96.7970], {
        radius: 5000,
        color: '#dc2626',
        weight: 2,
        opacity: 0.3,
        fillColor: '#dc2626',
        fillOpacity: 0.1
    }).addTo(map);
}

// Prediction Chart Initialization
function initializePredictionChart() {
    const chartDom = document.getElementById('predictionChart');
    const myChart = echarts.init(chartDom);

    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['6AM', '8AM', '10AM', '12PM', '2PM', '4PM', '6PM', '8PM', '10PM', '12AM', '2AM', '4AM'],
            axisLine: {
                lineStyle: {
                    color: '#6b7280'
                }
            }
        },
        yAxis: {
            type: 'value',
            name: 'Probability %',
            axisLine: {
                lineStyle: {
                    color: '#6b7280'
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#f3f4f6'
                }
            }
        },
        series: [
            {
                name: 'Storm Probability',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                    width: 3,
                    color: '#dc2626'
                },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: 'rgba(220, 38, 38, 0.3)'
                        }, {
                            offset: 1, color: 'rgba(220, 38, 38, 0.05)'
                        }]
                    }
                },
                emphasis: {
                    focus: 'series'
                },
                data: [15, 25, 45, 68, 85, 92, 87, 78, 65, 45, 30, 20]
            },
            {
                name: 'Hail Risk',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                    width: 2,
                    color: '#b45309'
                },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: 'rgba(180, 83, 9, 0.2)'
                        }, {
                            offset: 1, color: 'rgba(180, 83, 9, 0.05)'
                        }]
                    }
                },
                emphasis: {
                    focus: 'series'
                },
                data: [5, 12, 28, 45, 67, 78, 72, 58, 42, 25, 15, 8]
            }
        ]
    };

    myChart.setOption(option);

    // Make chart responsive
    window.addEventListener('resize', function() {
        myChart.resize();
    });
}

// Interactive Elements
function initializeInteractiveElements() {
    // Quick action buttons
    const exportBtn = document.querySelector('button:contains("Export 47 High-Risk Leads")');
    const marketingBtn = document.querySelector('button:contains("Generate Marketing Campaign")');
    const assignBtn = document.querySelector('button:contains("Assign to Sales Teams")');

    // Add click handlers for buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function() {
            if (this.textContent.includes('Export 47 High-Risk Leads')) {
                showNotification('Exporting 47 leads to CRM system...', 'success');
                simulateExport();
            } else if (this.textContent.includes('Generate Marketing Campaign')) {
                showNotification('Generating targeted marketing campaign...', 'info');
                simulateMarketing();
            } else if (this.textContent.includes('Assign to Sales Teams')) {
                showNotification('Opening team assignment interface...', 'info');
                simulateAssignment();
            }
        });
    });

    // Property score cards hover effects
    const propertyCards = document.querySelectorAll('.probability-high, .probability-medium, .probability-low');
    propertyCards.forEach(card => {
        card.addEventListener('click', function() {
            const address = this.querySelector('.font-medium').textContent;
            showPropertyDetails(address);
        });
    });

    // Navigation active state management
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== 'index.html') {
                e.preventDefault();
                showNotification('Navigating to ' + this.textContent + ' page...', 'info');
                setTimeout(() => {
                    window.location.href = this.getAttribute('href');
                }, 500);
            }
        });
    });
}

// Utility Functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transition-all duration-300 transform translate-x-full`;
    
    const colors = {
        success: 'bg-green-500 text-white',
        info: 'bg-blue-500 text-white',
        warning: 'bg-yellow-500 text-black',
        error: 'bg-red-500 text-white'
    };
    
    notification.className += ` ${colors[type]}`;
    notification.innerHTML = `
        <div class="flex items-center">
            <span class="flex-1">${message}</span>
            <button class="ml-2 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

function simulateExport() {
    // Simulate CRM export process
    setTimeout(() => {
        showNotification('Successfully exported 47 leads to CRM system!', 'success');
    }, 2000);
}

function simulateMarketing() {
    // Simulate marketing campaign generation
    setTimeout(() => {
        showNotification('Marketing campaign generated. 3,250 postcards ready for printing.', 'success');
    }, 1500);
}

function simulateAssignment() {
    // Simulate team assignment
    setTimeout(() => {
        showNotification('Team assignment interface opened. 47 leads distributed among 3 sales reps.', 'info');
    }, 1000);
}

function showPropertyDetails(address) {
    showNotification(`Opening detailed view for ${address}...`, 'info');
    // In a real application, this would open a modal or navigate to a detail page
}

// Real-time data simulation
function simulateRealTimeUpdates() {
    setInterval(() => {
        // Update timestamp
        const timestampElements = document.querySelectorAll('.text-sm.text-gray-600');
        timestampElements.forEach(el => {
            if (el.textContent.includes('Last updated:')) {
                const minutes = Math.floor(Math.random() * 10) + 1;
                el.textContent = `Last updated: ${minutes} minute${minutes > 1 ? 's' : ''} ago`;
            }
        });
    }, 30000); // Update every 30 seconds
}

// Initialize real-time updates
simulateRealTimeUpdates();

// Handle window resize for responsive charts
window.addEventListener('resize', function() {
    // Reinitialize charts if needed
    setTimeout(() => {
        if (document.getElementById('predictionChart')) {
            initializePredictionChart();
        }
    }, 100);
});

// Mobile menu toggle (if needed)
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

// Export functions for global access
window.LuminallApp = {
    showNotification,
    simulateExport,
    simulateMarketing,
    simulateAssignment,
    showPropertyDetails,
    toggleMobileMenu
};