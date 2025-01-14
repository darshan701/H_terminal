
window.addEventListener("load", (event) => {
    start();
});


let currentFolder = '';

let username = 'MzI3NTI4MzQ5';

function disableDebugAccess() {
    document.addEventListener('keydown', (event) => {
        if (event.ctrlKey && event.shiftKey && event.key === 'I') {
            event.preventDefault();
        }
        if(event.key === 'F12'){
            event.preventDefault();
        }
        if(event.ctrlKey && event.key === 'U'){
            event.preventDefault();
        }
    });
    document.addEventListener('contextmenu', (event) => {
        event.preventDefault();
    });
}

function start(){
    disableDebugAccess();
    registerCommand('help', () => {
        printLine('Available commands:');
        printLine('help - show this help');
        printLine('ls - list files');
        printLine('cd [folder] - change directory');
        printLine('cat [filename] - read specified file');
        printLine('echo [text] - print text');
        printLine('clear - clear screen');
        printLine('pwd - print current folder');
        printLine('logout - logout from current session');
    });

    registerCommand('logout', () => {
        const askLogin = (realUsername, realPassword, clear = true) => {
            if (clear)
                clearScreen();
            print('login: ');
            readLine().then((username) => {
                print('password: ');
                hideInput();
                readLine().then((password) => {
                    showInput();
                    if(username === realUsername && password === realPassword){
                        //printLine('Access granted');
                        clearScreen();
                        currentFolder = '/home/' + realUsername;
                        printCharacterByCharacter("Welcome, " + atob('QWxkZW4gLkY=').trim() + " !\nHD_Terminal Version 2.25\n\nType \'help\' to see available commands\n\n", 50)
                            .then(() => {
                                finishCommand();
                            });
                        return;
                    }
                    clearScreen();
                    printLine('Access denied');
                    askLogin(realUsername, realPassword, false);
                });
            });
        }
        askLogin(atob(username).trim(), atob('UDE2MjQ4aGwjNQ==').trim());
    });

    registerCommand('clear', () => {
        clearScreen(true);
    });
    registerShortcut('ctrl', 'l', () => {
        clearScreen(true);
    });
    registerCommand('pwd', () => {
        printLine(currentFolder);
    });

    registerCommand('ls', () => {
        switch (currentFolder) {
            case '/home/'+atob(username).trim():
                printLine('Documents/');
                printLine('Images/');
                printLine('Logs/');
                printLine('contract_506.txt');
                printLine('project736.txt [empty]');
                break;
            case '/home/'+atob(username).trim()+'/Documents':
                printLine('Resume_2022_Backup.pdf');
                printLine('TestResult_071124.txt');
                printLine('TestResult_120824.txt');
                printLine('TestResult_171024.txt [empty]');
                printLine('TestResult_230524.txt [empty]');
                printLine('TestResult_110823.txt [empty]');
                printLine('EngineeringReport_140924.docx');
                break;
            case '/home/'+atob(username).trim()+'/Images':
                printLine('GPR-G3_Blueprint.png');
                printLine('ID.png');
                break;
            default:
                printLine('[empty]');
                break;

        }

    });

    registerCommand('cat', (args) => {
        if(args.length === 0){
            printLine('Usage: cat [filename]');
        } else {
            switch(args[0]){
                case 'contract_506.txt':
                    if(currentFolder !== '/home/'+atob(username).trim()){
                        printLine('File not found');
                        break;
                    }
                    printCharacterByCharacter(`HELLION DYNAMICS INTERNAL MEMODocument ID: HD-14X-09-PROJINFTOP SECRET – AUTHORIZED ACCESS ONLYDigital Copy 01/03

SUBJECT: Project Inferno – Acquisition and Release Agreement
DATE: [REDACTED]STATUS: ACTIVE

MEMORANDUM OF UNDERSTANDING
This agreement, though unauthorized under formal jurisdiction, serves as a binding resolution between:
HELLION DYNAMICS, LLCRepresented by: Dr. Alden Frost (Chief Biochemical Researcher)
&
[REDACTED ENTITY] – MINISTRY OF NATIONAL SECURITY (MNS)
KEY PROVISIONS
1.\tAsset Transfer:Hellion Dynamics shall provide comprehensive schematics and prototype documentation for the Project Inferno (GDB-X01) bio-dispersal weapon.
2.\tExchange Terms: 
o\tThe immediate release of Prisoner #019F23 (Alias: “Shadow”) from [REDACTED DETENTION FACILITY].
o\tFinancial compensation of $8,750,000 USD to be wired to the offshore account [HORIZON TRUST - 0039X442AF], registered under A.Frost International Holdings.
3.\tNon-Disclosure and Nullification Clause:All parties involved are to ensure the destruction of evidence post-transfer. Any traceability of this agreement will result in immediate nullification of terms.
4.\tPenalty Stipulation:Failure to comply with the above provisions shall lead to the forfeiture of Prisoner #019F23 and the termination of pre-established channels.

Dr. Alden FrostLead Researcher, Hellion Dynamics
[REDACTED]Authorized Representative, Ministry of National Security\n
                    `, 2).then(() => finishCommand());
                    break;
                case 'project736.txt':
                    if(currentFolder !== '/home/'+atob(username).trim()){
                        printLine('File not found');
                        break;
                    }
                    printLine('This file contains 0 bytes of data\n' +
                        '[File will be no longer be available after the next network refresh]');
                    break;
                case 'Resume_2022_Backup.pdf':
                    if(currentFolder !== '/home/'+atob(username).trim()+'/Documents'){
                        printLine('File not found');
                        break;
                    }
                    printCharacterByCharacter(`
Name: Alden Frost
Address: [Redacted]
Phone: [Redacted]
Email: [Redacted]
Date of Application: February 15, 2022
Position Applied For: Lead Research Scientist – Weapons R&D, Hellion Dynamics
__
Education
Ph.D. in Synthetic Biology
Harvard University – Cambridge, MA, 2018
•    Advanced genetic modification, biotoxins, and pathogen engineering.
Master’s Degree in Biotechnology and Toxicology
UC Berkeley – Berkeley, CA, 2014
•    Biodegradable carriers for synthetic toxin delivery.
Bachelor’s Degree in Biomedical Engineering and Molecular Biology
MIT – Cambridge, MA, 2012
•    Focused on bio-mechanical systems and genetic analysis.
__
Work Experience
Lead Scientist – Biochemical Threat Mitigation
Government Contractor – Washington, D.C. (2018–2021)
•    Developed countermeasures for biochemical threats and rapid-response vaccines.
•    Managed BSL-4 pathogen weaponization and containment projects.
•    Authored classified biochemical vulnerability assessments.
Research Associate – Bioweapon Detection Systems
CDC – Atlanta, GA (2014–2017)
•    Designed biosensors for pathogen detection.
•    Studied environmental persistence of bio-agents.
Intern – Pathogen Engineering Division
Raytheon Technologies – Waltham, MA (2011–2012)
•    Assisted in non-lethal bio-agent delivery system designs.
•    Awarded “Outstanding Intern of the Year.”
__
Technical Skills
•    BSL-3/BSL-4 lab protocols and pathogen containment.
•    CRISPR gene editing and synthetic DNA design.
•    Toxicology and counteragent development.
•    Analytical software for molecular modeling.
•    AI-driven chemical/biological threat analysis.
__
Publications and Patents
•    “Programmable Bioweapons” – Nature Biotechnology, 2019.
•    Patent #US2020XYZ – Modular synthetic pathogen delivery system.
__
Awards and Honors
•    National Defense Science and Engineering Fellowship (NDSEG) – 2016.
•    Distinguished Young Scientist Award – Biodefense Research Council, 2020.
__
Security Clearance
•    Top Secret – SCI, issued in 2018.
__
Professional Statement
I am committed to advancing biochemical technologies to address future global threats. My expertise in pathogen research, countermeasure development, and synthetic biology will enable Hellion Dynamics to innovate and achieve its mission.
__
References
Available upon request.

                    `, 2).then(() => finishCommand());
                    break;
                case 'TestResult_071124.txt':
                    if(currentFolder !== '/home/'+atob(username).trim()+'/Documents'){
                        printLine('File not found');
                        break;
                    }
                    printCharacterByCharacter(`
Hellion Dynamics Internal Document [CLASSIFIED – LEVEL 5 CLEARANCE REQUIRED]
________________________________________
Project Designation: GPR-G3478921 – "Erebos Pathogen" Test Report ID: HD-GPR347-FT23 Test Date: November 7, 2024 Location: Remote Facility Alpha-09 (Latitude: [Redacted], Longitude: [Redacted]) Lead Researcher: Dr. Alden Frost
________________________________________
Objective
To evaluate the efficacy of GPR-G3478921 in a controlled field test simulating urban conditions. The primary goals include:
•Determining the dispersal efficiency of the pathogen under variable environmental conditions.
•Measuring the biological impact on living subjects (Test Groups Alpha and Beta).
•Assessing containment protocols for post-test cleanup.
________________________________________
Summary of Test Parameters
•Pathogen Properties: Genetically engineered neurotoxin-producing bacterium. Targeted to induce paralysis within 15 minutes of exposure, followed by systemic organ failure within 4 hours.
•Delivery Mechanism: Aerosol dispersal via modified UAV (Unit HD-UAV-12).
•Test Subjects:
oTest Group Alpha: 20 standard laboratory primates (Macaca mulatta).
oTest Group Beta: 15 humanoid cadavers prepared to mimic real-time metabolic decay for environmental interaction studies.
•Environmental Conditions: Simulated urban setup with enclosed structures, airflow control, and environmental hazards (e.g., heat, humidity).
________________________________________
Results
1. Dispersal Efficiency:
•GPR-G3478921 achieved 93% saturation within the test zone in under 3 minutes. The UAV performed within expected parameters, maintaining uniform aerosol coverage.
•Wind and humidity marginally reduced dispersion effectiveness along the perimeter (approx. 7% loss of potency).
2. Biological Impact:
•Test Group Alpha: All subjects exhibited full neurotoxin-induced paralysis within 12-18 minutes of exposure. Organ failure observed uniformly at approximately 4.2 hours.
oNecropsy confirmed degradation of the central nervous system and widespread cellular apoptosis.
•Test Group Beta: Post-mortem analysis revealed significant tissue necrosis and structural compromise in 80% of cadavers, mimicking advanced stages of bio-agent exposure in humans.
3. Containment Protocols:
•Cleanup operations successfully neutralized 98% of residual bio-agent with proprietary counter-agent (CD-78). Residual trace elements detected near dispersal site perimeter require revaluation of containment measures.
________________________________________
Incident Report
During Phase 2 of the test, unanticipated anomalies were noted:
•Subject Alpha-07 exhibited delayed paralysis onset (24 minutes) and exhibited severe agitation prior to collapse. Genetic analysis is underway to determine potential resistance factors.
•UAV malfunction during extraction phase led to a minor breach of containment zone perimeter. Emergency protocols were initiated, with no detected spread beyond controlled areas.
•Dr. Frost noted unusual pathogen behavior during decomposition stages, stating: "GPR-G3478921 appears to exhibit self-propagating tendencies under specific conditions. Further analysis is critical to determine whether mutation occurred post-release or during bio-agent synthesis."
________________________________________
Conclusions
GPR-G3478921 demonstrates exceptional potential as a targeted bioweapon, meeting primary objectives for dispersal efficiency and lethality. However, the observed anomalies and containment challenges underscore the need for:
1.Enhanced counter-agent formulations to ensure complete neutralization.
2.Rigorous testing of genetic stability to prevent unintended mutation or propagation.
3.Further investigation into potential resistance mechanisms in live subjects.
________________________________________
Recommendations
1.Approve Phase 3 testing under expanded conditions, including partial urban population simulations.
2.Begin deployment readiness protocols for GPR-G3478921 while addressing noted containment flaws.
3.Allocate additional resources for genetic stability studies and redundancy in countermeasure development.
________________________________________
Prepared By: Dr. Alden Frost
Lead Research Scientist – Weapons R&D
Hellion Dynamics
________________________________________
This document and its contents are the property of Hellion Dynamics. Unauthorized access, duplication, or distribution is prohibited and will be prosecuted under applicable laws.
`, 2).then(() => finishCommand());
                    break;
                case 'TestResult_120824.txt':
                    if(currentFolder !== '/home/'+atob(username).trim()+'/Documents'){
                        printLine('File not found');
                        break;
                    }
                    printCharacterByCharacter(`
Hellion Dynamics Internal Document [CLASSIFIED – LEVEL 5 CLEARANCE REQUIRED]
________________________________________
Project Designation: GPR-G3478921 Test Report ID: HD-GPR3478-FT21 Test Date: August 12, 2024 Location: Remote Facility Beta-06 (Latitude: [Redacted], Longitude: [Redacted]) Lead Researcher: Dr. Alden Frost
________________________________________
Objective
To evaluate the initial field deployment of GPR-G3478921 under controlled conditions, focusing on:
•Dispersal reliability in variable environments.
•Lethality consistency across diverse biological test groups.
•Effectiveness of containment and neutralization protocols.
________________________________________
Summary of Test Parameters
•Pathogen Properties: Proto-version of GPR-G3478921 featuring a modified neurotoxin delivery system with delayed activation. Designed to incapacitate within 30 minutes, followed by induced respiratory failure.
•Delivery Mechanism: Prototype drone dispersal (Unit HD-UAV-09).
•Test Subjects:
oTest Group Alpha: 15 laboratory primates (Macaca mulatta).
oTest Group Beta: 10 humanoid cadavers, chemically treated to mimic active metabolic reactions.
•Environmental Conditions: Open-air test zone simulating a semi-rural environment with natural wind and variable humidity.
________________________________________
Results
1. Dispersal Reliability:
•Prototype UAV malfunctioned mid-dispersal, resulting in uneven coverage. Only 67% of the test zone reached optimal pathogen concentration.
•Wind variability further diluted aerosol effectiveness, particularly near the zone's outer edges.
2. Lethality Consistency:
•Test Group Alpha:
oParalysis onset varied significantly (18-43 minutes post-exposure).
oMortality rates reached only 60%, with several subjects exhibiting delayed or incomplete responses to the neurotoxin.
oNecropsy revealed incomplete distribution of the pathogen within subjects' respiratory systems, likely due to inconsistent dispersal.
•Test Group Beta:
oTissue necrosis was limited to surface layers, failing to mimic advanced biological degradation as expected.
oChemical markers of neurotoxin activity were present, but insufficient to achieve full systemic collapse.
3. Containment Protocols:
•Counter-agent CD-65 neutralized 85% of residual pathogen, but trace amounts were detected outside the primary test zone. Containment crews required extended cleanup periods, delaying test conclusion.
________________________________________
Incident Report
•Subject Alpha-03 exhibited signs of partial recovery after initial paralysis, regaining motor function within 2 hours. Subsequent analysis suggested incomplete neurotoxin binding at cellular targets.
•Drone control system failure necessitated manual override, exposing personnel to potential pathogen contact (no casualties reported).
•Environmental samples collected post-test indicated pathogen degradation under high humidity, raising concerns about stability in tropical climates.
________________________________________
Conclusions
The initial field deployment of GPR-G3478921 revealed critical deficiencies in both delivery mechanisms and biological efficacy. While partial success was achieved, key objectives were unmet.
________________________________________
Recommendations
1.Refine UAV dispersal systems to ensure even coverage across test zones. Investigate redundancy protocols to mitigate mechanical failures.
2.Enhance neurotoxin binding properties to improve lethality consistency across diverse subjects.
3.Conduct stability tests in varied environmental conditions to address degradation concerns.
4.Increase counter-agent efficacy to achieve 100% neutralization during containment operations.
________________________________________
Prepared By: Dr. Alden Frost
Lead Research Scientist – Weapons R&D
Hellion Dynamics
________________________________________
This document and its contents are the property of Hellion Dynamics. Unauthorized access, duplication, or distribution is prohibited and will be prosecuted under applicable laws.
`, 2).then(() => finishCommand());
                    break;
                case 'TestResult_171024.txt':
                    if(currentFolder !== '/home/'+atob(username).trim()+'/Documents'){
                        printLine('File not found');
                        break;
                    }
                    printLine('This file contains 0 bytes of data\n' +
                        '[File will be no longer be available after the next network refresh]');
                    break;
                case 'TestResult_230524.txt':
                    if(currentFolder !== '/home/'+atob(username).trim()+'/Documents'){
                        printLine('File not found');
                        break;
                    }
                    printLine('This file contains 0 bytes of data\n' +
                        '[File will be no longer be available after the next network refresh]');
                    break;
                case 'TestResult_110823.txt':
                    if(currentFolder !== '/home/'+atob(username).trim()+'/Documents'){
                        printLine('File not found');
                        break;
                    }
                    printLine('This file contains 0 bytes of data\n' +
                        '[File will be no longer be available after the next network refresh]');
                    break;
                case 'EngineeringReport_140924.docx':
                    if(currentFolder !== '/home/'+atob(username).trim()+'/Documents'){
                        printLine('File not found');
                        break;
                    }
                    printCharacterByCharacter(`
Hellion Dynamics Internal Document [CLASSIFIED – LEVEL 5 CLEARANCE REQUIRED]
________________________________________
Engineering Report
Subject: GPR-G3478921 Prototype – Development and Functional Overview
Report ID: HD-GPR3478-ER22
Report Date: September 14, 2024
Prepared By: Dr. Michael Yates, Lead Engineer – Advanced Weapon Systems
________________________________________
Overview
The GPR-G3478921, codenamed "X Lance," represents the cutting edge of hybrid bioweapon delivery systems. Designed for stealth deployment and maximized target efficiency, the device integrates advanced nanotechnology with a proprietary dispersal mechanism. The following report provides an analysis of its components, operational principles, and identified areas for improvement.
________________________________________
Technical Specifications
Dimensions: 1.583 m (length) x 0.645 m (diameter at widest point)
Weight: 42.8 kg (unloaded)
Key Components:
•Nanovate Tip: A sharpened, ultra-durable composite for precision delivery. Encased in adaptive materials designed to puncture reinforced surfaces with minimal structural degradation.
•Gas Outlet: Ensures controlled dispersal of payload upon activation.
•Impact Detector: Triggers payload release mechanism upon achieving sufficient kinetic force.
•Hydrogen Reservoir: Stores fuel for propulsion and nanotechnology activation.
•Oxygen Reservoir: Supplies oxidizing agent for fuel combustion.
•Laminar Inlet System: Streamlines airflow for stable operation.
•Compressor Cooling System: Maintains operational temperature within safe limits during deployment.
•Rao Nozzle: Optimized for controlled propulsion and trajectory stabilization.
________________________________________
Operational Principles
Upon deployment, the GPR-G3478921 utilizes the following sequential functions:
1.Impact Phase:
oThe Nanovate Tip punctures the target surface, activating the Impact Detector.
2.Payload Release:
oOnce the Impact Detector confirms proper alignment, the gas outlet initiates the controlled dispersal of the bioweapon agent (PX-317).
3.Self-Destruct Protocol:
oResidual internal mechanisms trigger the destruction of key components to prevent reverse engineering. This feature has shown 75% reliability in current tests.
________________________________________
Recent Field Test Observations
Field Test ID: HD-GPR3478-FT11
Date: September 8, 2024
Summary: Prototype tested under semi-controlled conditions in a desert environment. The following results were observed:
•Accuracy:
oAchieved a 92% success rate in targeting high-priority zones.
oDeviations in flight path attributed to minor inconsistencies in the Rao Nozzle design.
•Payload Efficiency:
oSuccessful dispersal of PX-317 within a 15-meter radius. However, uneven distribution along the outer perimeter was noted, resulting in a reduced lethality rate of 87%.
•Containment and Cleanup:
oPost-test analysis revealed trace amounts of PX-317 in unexpected areas, indicating potential flaws in dispersal targeting protocols.
________________________________________
Identified Issues and Recommendations
1.Rao Nozzle Stabilization:
oObserved inconsistencies in trajectory require refinement of nozzle alignment. Recommend testing alternative geometries to enhance aerodynamic stability.
2.Payload Consistency:
oUneven dispersal indicates a need for recalibrating the gas outlet mechanism. Future iterations should include real-time adjustment capabilities.
3.Self-Destruct Protocol Reliability:
oCurrent 75% success rate in component destruction is insufficient for field use. Recommend implementing a secondary failsafe.
4.Environmental Impact Mitigation:
oTrace bioweapon presence beyond intended zone requires further containment measures. Propose testing of advanced dispersal inhibitors.
________________________________________
Conclusion
The GPR-G3478921 demonstrates significant potential as a next-generation bioweapon delivery system. Despite its effectiveness in key areas, critical adjustments are necessary to meet operational standards. Continued refinement and rigorous testing will ensure readiness for Phase 3 deployment.
________________________________________
Prepared By:
Dr. Michael Yates
Lead Engineer – Advanced Weapon Systems
Hellion Dynamics
________________________________________
This document and its contents are the property of Hellion Dynamics. Unauthorized access, duplication, or distribution is prohibited and will be prosecuted under applicable laws.
                    `, 2).then(() => finishCommand());
                    break;
                case 'GPR-G3_Blueprint.png':
                    if(currentFolder !== '/home/'+atob(username).trim()+'/Images'){
                        printLine('File not found');
                        break;
                    }
                    printImage('assets/img/GPR-G3_Blueprint-Preview.png', 'assets/img/GPR-G3_Blueprint.png');
                    break;
                case 'ID.png':
                    if(currentFolder !== '/home/'+atob(username).trim()+'/Images'){
                        printLine('File not found');
                        break;
                    }
                    printImage('assets/img/ID-Preview.png', 'assets/img/ID.png');
                    break;
                default:
                    printLine('File not found');
                    break;
            }
        }
    });

    registerCommand('cd', (args) => {
        if(args.length === 0){
            if(currentFolder.startsWith('/home/'+atob(username).trim())){
                currentFolder = '/home/'+atob(username).trim();
                prompt = '⌂ > ';
            }
        } else {
            switch(args[0]){
                case 'Documents':
                    if(currentFolder !== '/home/'+atob(username).trim()){
                        printLine('Folder not found');
                        break;
                    }
                    currentFolder += '/Documents';
                    break;
                case 'Images':
                    if(currentFolder !== '/home/'+atob(username).trim()){
                        printLine('Folder not found');
                        break;
                    }
                    currentFolder += '/Images';
                    break;
                case 'Logs':
                    if(currentFolder !== '/home/'+atob(username).trim()){
                        printLine('Folder not found');
                        break;
                    }
                    currentFolder += '/Logs';
                    break;
                case '..':
                    if(currentFolder === '/home/'+atob(username).trim()){
                        printLine('Cannot go back');
                        break;
                    }
                    currentFolder = '/home/'+atob(username).trim();
                    break;
                default:
                    printLine('Folder not found');
                    break;
            }
            prompt = currentFolder.replace('/home/'+atob(username).trim(), '⌂') + ' > ';
        }
    });

    registerCommand('echo', (args) => {
        printCharacterByCharacter(args.join(' '), 50).then(() => {
            printLine('');
        }).then(() => finishCommand());
    });

    execCmd('logout');
}