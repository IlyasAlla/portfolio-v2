
        // Matrix rain effect
        const canvas = document.getElementById('matrix-bg');
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);

        function drawMatrix() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#00ff00';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        setInterval(drawMatrix, 35);

        // Terminal functionality
        const terminalOutput = document.getElementById('terminal-output');
        const terminalInput = document.getElementById('terminal-input');
        const loginScreen = document.getElementById('login-screen');
        const loginForm = document.getElementById('login-form');
        const loaderScreen = document.getElementById('loader-screen');
        const loaderStatus = document.getElementById('loader-status');
        let commandHistory = [];
        let historyIndex = -1;
        let isLoggedIn = false;

        // Handle login
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            
            if (username.trim() !== '') {
                // Hide login screen
                loginScreen.style.opacity = '0';
                setTimeout(() => {
                    loginScreen.classList.add('hidden');
                    
                    // Show loader
                    loaderScreen.classList.remove('hidden');
                    
                    const loadingMessages = [
                        'Loading modules...',
                        'Initializing kernel...',
                        'Mounting filesystems...',
                        'Starting services...',
                        'Loading user profile...',
                        'Almost ready...'
                    ];
                    
                    let msgIndex = 0;
                    const msgInterval = setInterval(() => {
                        if (msgIndex < loadingMessages.length) {
                            loaderStatus.textContent = loadingMessages[msgIndex];
                            msgIndex++;
                        }
                    }, 350);
                    
                    // Hide loader after animation completes
                    setTimeout(() => {
                        clearInterval(msgInterval);
                        loaderScreen.style.opacity = '0';
                        setTimeout(() => {
                            loaderScreen.classList.add('hidden');
                            isLoggedIn = true;
                            bootSequence();
                            terminalInput.focus();
                        }, 500);
                    }, 2300);
                }, 500);
            }
        });

        // Focus username on page load
        window.addEventListener('load', () => {
            document.getElementById('username').focus();
        });

        const commands = {
            help: `<div class="section-title">Available Commands</div>
<div style="margin: 10px 0;">
    <span class="info">about</span>        - Display information about me
</div>
<div style="margin: 10px 0;">
    <span class="info">skills</span>       - Show my technical skills
</div>
<div style="margin: 10px 0;">
    <span class="info">projects</span>     - List my projects
</div>
<div style="margin: 10px 0;">
    <span class="info">certificates</span> - View my certifications
</div>
<div style="margin: 10px 0;">
    <span class="info">experience</span>   - Show work experience
</div>
<div style="margin: 10px 0;">
    <span class="info">resume</span>       - Access my resume
</div>
<div style="margin: 10px 0;">
    <span class="info">contact</span>      - Get my contact information
</div>
<div style="margin: 10px 0;">
    <span class="info">clear</span>        - Clear the terminal
</div>
<div style="margin: 10px 0;">
    <span class="info">matrix</span>       - Toggle Matrix effect
</div>
<div style="margin: 10px 0;">
    <span class="info">help</span>         - Show this help message
</div>`,
            
            about: `<div class="section-title">About Me</div>
<div style="margin: 10px 0;">
    <span class="success">Name:</span> Your Name
</div>
<div style="margin: 10px 0;">
    <span class="success">Role:</span> IT & Cloud / Pentester
</div>
<div style="margin: 10px 0;">
    <span class="success">Location:</span> Your Location
</div>
<div style="margin: 10px 0;">
    <span class="success">Status:</span> Available for opportunities
</div>
<span class="success"> I'm a passionate IT professional with expertise in cybersecurity, 
cloud, and system administration. I love exploring new technologies 
and building innovative solutions.</span>`,

            skills: function() {
                const skills = [
                    { name: 'Linux/Unix', level: 90 },
                    { name: 'Python', level: 85 },
                    { name: 'JavaScript', level: 80 },
                    { name: 'Cybersecurity', level: 85 },
                    { name: 'Networking', level: 80 },
                    { name: 'Docker/K8s', level: 75 },
                    { name: 'SQL/NoSQL', level: 80 },
                    { name: 'Cloud (AWS/Azure)', level: 70 }
                ];

                let output = '<div class="section-title">Technical Skills</div>';
                skills.forEach(skill => {
                    output += `<div class="skill-bar">
                        <span class="skill-name">${skill.name}</span>
                        <div class="bar-container">
                            <div class="bar-fill" style="width: ${skill.level}%"></div>
                        </div>
                        <span style="margin-left: 10px; color: #00ff00;">${skill.level}%</span>
                    </div>`;
                });
                return output;
            },

            projects: `<div class="section-title">Featured Projects</div>

<div class="project-card">
    <div class="project-title">→ Network Security Scanner</div>
    <span class="info">Tech:</span> Python, Scapy, Nmap
    <div>Automated vulnerability scanner for network infrastructure</div>
    <a href="#" target="_blank">github.com/yourname/project1</a>
</div>

<div class="project-card">
    <div class="project-title">→ Cloud Infrastructure Manager</div>
    <span class="info">Tech:</span> Terraform, AWS, Python
    <div>IaC solution for automated cloud deployment</div>
    <a href="#" target="_blank">github.com/yourname/project2</a>
</div>

<div class="project-card">
    <div class="project-title">→ Real-time Monitoring Dashboard</div>
    <span class="info">Tech:</span> Node.js, React, WebSocket
    <div>Live system monitoring with custom alerts</div>
    <a href="#" target="_blank">github.com/yourname/project3</a>
</div>`,

            certificates: `<div class="section-title">Certifications & Achievements</div>

<div class="project-card">
    <div class="project-title">✓ CompTIA Security+</div>
    <span class="info">Issued:</span> 2023
    <div>Certification ID: COMP001234567</div>
</div>

<div class="project-card">
    <div class="project-title">✓ AWS Certified Solutions Architect</div>
    <span class="info">Issued:</span> 2023
    <div>Certification ID: AWS-SAA-123456</div>
</div>

<div class="project-card">
    <div class="project-title">✓ Certified Ethical Hacker (CEH)</div>
    <span class="info">Issued:</span> 2022
    <div>Certification ID: ECC1234567890</div>
</div>

<div class="project-card">
    <div class="project-title">✓ Cisco CCNA</div>
    <span class="info">Issued:</span> 2022
    <div>Certification ID: CSCO12345678</div>
</div>

<span class="info">All certifications are active and up to date.</span>`,

            experience: `<div class="section-title">Work Experience</div>

<span class="success">Senior IT Specialist @ Tech Company Inc.</span>
<span class="info">2022 - Present</span>
    <div style="margin: 10px 0;">
        <span> • Led security infrastructure improvements</span>
    </div>
    <div style="margin: 10px 0;">
        <span> • Implemented automated deployment pipelines</span>
    </div>
    <div style="margin: 10px 0;">
        <span> • Managed cloud infrastructure migration</span>
    </div>

<span class="success">Systems Administrator</span> @ Startup Co.
<span class="info">2020 - 2022</span>
<div style="margin: 10px 0;">
<span> • Maintained Linux server infrastructure</span>
</div>
<div style="margin: 10px 0;">
<span> • Developed internal automation tools</span>
</div>
<div style="margin: 10px 0;">
<span> • Handled incident response and troubleshooting`,

            contact: `<div class="section-title">Contact Information</div>
<div style="margin: 10px 0;">
    <span class="success">Email:</span> <a href="mailto:your.email@example.com">your.email@example.com</a>
</div>
<div style="margin: 10px 0;">
    <span class="success">GitHub:</span> <a href="https://github.com/yourusername" target="_blank">github.com/yourusername</a>
</div>
    <div style="margin: 10px 0;">
    <span class="success">LinkedIn:</span> <a href="https://linkedin.com/in/yourprofile" target="_blank">linkedin.com/in/yourprofile</a>
</div>
    <div style="margin: 10px 0;">
    <span class="success">Twitter:</span> <a href="https://twitter.com/yourhandle" target="_blank">@yourhandle</a>
</div>
<span class="info">Feel free to reach out for collaborations or opportunities!</span>`,

            clear: 'CLEAR',
            cls: 'CLEAR',
            matrix: 'TOGGLE_MATRIX'
        };

        function bootSequence() {
            const bootMessages = [
                '<span class="boot-sequence">Last login: ' + new Date().toDateString() + ' from 192.168.1.100</span>',
                '<span class="boot-sequence">Linux portfolio 6.9.1-arch1-1 #1 SMP PREEMPT_DYNAMIC Arch Linux 6.9.1-arch1-1 (2025-10-13) x86_64</span>',
                '',
                '<span class="boot-sequence">[  OK  ] Started Terminal Portfolio System</span>',
                '<span class="boot-sequence">[  OK  ] Started Shell Interface.</span>',
                
                '<span class="boot-sequence">[  OK  ] Reached target Multi-User System</span>',
                '',
                '<span class="ascii-art">    ███████╗██╗  ██╗ █████╗ ██╗  ██╗\n    ██╔════╝██║  ██║██╔══██╗╚██╗██╔╝\n    ███████╗███████║╚██████║ ╚███╔╝\n    ╚════██║██╔══██║ ╚═══██║ ██╔██╗\n    ███████║██║  ██║ █████╔╝██╔╝ ██╗\n    ╚══════╝╚═╝  ╚═╝ ╚════╝ ╚═╝  ╚═╝\n    </span>', 
                '',
                '<span class="success">✓ Authentication successful. Welcome to my portfolio terminal!</span>',
                '',
                'Type <span class="command">help</span> to see available commands.',
                ''
            ];

            let i = 0;
            const interval = setInterval(() => {
                if (i < bootMessages.length) {
                    addOutput(bootMessages[i]);
                    i++;
                } else {
                    clearInterval(interval);
                    // Show input line after boot sequence completes
                    const inputLine = terminalOutput.querySelector('.input-line');
                    inputLine.classList.remove('hidden');
                    terminalInput.focus();
                }
            }, 150);
        }

        function addOutput(text, isCommand = false) {
            const line = document.createElement('div');
            line.className = 'output-line';
            
            if (isCommand) {
                line.innerHTML = `<span class="prompt">root@portfolio:~#</span> <span class="command">${text}</span>`;
            } else {
                line.innerHTML = text;
            }
            
            const inputLine = terminalOutput.querySelector('.input-line');
            terminalOutput.insertBefore(line, inputLine);
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }

        function executeCommand(cmd) {
            const trimmedCmd = cmd.trim().toLowerCase();
            
            if (trimmedCmd === '') return;
            
            commandHistory.push(cmd);
            historyIndex = commandHistory.length;
            
            addOutput(cmd, true);
            
            if (commands[trimmedCmd]) {
                if (trimmedCmd === 'clear' || trimmedCmd === 'cls') {
                    const lines = terminalOutput.querySelectorAll('.output-line');
                    lines.forEach(line => line.remove());
                } else if (trimmedCmd === 'matrix') {
                    const canvas = document.getElementById('matrix-bg');
                    canvas.classList.toggle('hidden');
                    const isHidden = canvas.classList.contains('hidden');
                    addOutput(`<span class="success">Matrix effect ${isHidden ? 'disabled' : 'enabled'}</span>`);
                } else if (typeof commands[trimmedCmd] === 'function') {
                    addOutput(commands[trimmedCmd]());
                } else {
                    addOutput(commands[trimmedCmd]);
                }
            } else {
                addOutput(`<span class="error">Command not found: ${cmd}</span>\nType <span class="command">help</span> for available commands.`);
            }
        }


        // Update the executeCommand function in script.js to handle commands with arguments:

function executeCommand(cmd) {
    const trimmedCmd = cmd.trim();
    
    if (trimmedCmd === '') return;
    
    commandHistory.push(cmd);
    historyIndex = commandHistory.length;
    
    addOutput(cmd, true);
    
    // Parse command and arguments
    const parts = trimmedCmd.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');
    
    if (commands[command]) {
        if (command === 'clear' || command === 'cls') {
            const lines = terminalOutput.querySelectorAll('.output-line');
            lines.forEach(line => line.remove());
        } else if (command === 'matrix') {
            const canvas = document.getElementById('matrix-bg');
            canvas.classList.toggle('hidden');
            const isHidden = canvas.classList.contains('hidden');
            addOutput(`<span class="success">Matrix effect ${isHidden ? 'disabled' : 'enabled'}</span>`);
        } else if (command === 'decode') {
            addOutput(commands.decode(args));
        } else if (typeof commands[command] === 'function') {
            addOutput(commands[command](args));
        } else {
            addOutput(commands[command]);
        }
    } else {
        addOutput(`<span class="error">Command not found: ${command}</span>\nType <span class="command">help</span> for available commands.`);
    }
}


        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                executeCommand(terminalInput.value);
                terminalInput.value = '';
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (historyIndex > 0) {
                    historyIndex--;
                    terminalInput.value = commandHistory[historyIndex];
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    terminalInput.value = commandHistory[historyIndex];
                } else {
                    historyIndex = commandHistory.length;
                    terminalInput.value = '';
                }
            } else if (e.key === 'Tab') {
                e.preventDefault();
                const partial = terminalInput.value.toLowerCase();
                const matches = Object.keys(commands).filter(cmd => cmd.startsWith(partial));
                if (matches.length === 1) {
                    terminalInput.value = matches[0];
                }
            }
        });

        document.addEventListener('click', (e) => {
            if (isLoggedIn && !e.target.closest('.login-screen')) {
                terminalInput.focus();
            }
        });

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

// Update the executeCommand function in script.js to handle resume prompt:

function executeCommand(cmd) {
    const trimmedCmd = cmd.trim();
    
    if (trimmedCmd === '') return;
    
    commandHistory.push(cmd);
    historyIndex = commandHistory.length;
    
    addOutput(cmd, true);
    
    const parts = trimmedCmd.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');
    
    if (commands[command]) {
        if (command === 'clear' || command === 'cls') {
            const lines = terminalOutput.querySelectorAll('.output-line');
            lines.forEach(line => line.remove());
        } else if (command === 'matrix') {
            const canvas = document.getElementById('matrix-bg');
            canvas.classList.toggle('hidden');
            const isHidden = canvas.classList.contains('hidden');
            addOutput(`<span class="success">Matrix effect ${isHidden ? 'disabled' : 'enabled'}</span>`);
        } else if (command === 'resume') {
            addOutput(`<div class="section-title">Resume Access</div>
<span class="info">This resume is password protected.</span>
<div style="margin: 15px 0;">
    <span class="success">Enter password:</span>
</div>`);
            waitingForPassword = true;
        } else {
            addOutput(commands[command]);
        }
    } else {
        addOutput(`<span class="error">Command not found: ${command}</span>\nType <span class="command">help</span> for available commands.`);
    }
}