export const SOLAR_PACKAGES = [
  {
    id: 'res-starter',
    name: 'Residential Starter',
    capacity: '5.4 kW',
    outputPerYear: '7,800 kWh',
    idealFor: '1-2 Bedroom Homes ($120-$180/mo bill)',
    price: '$9,800',
    afterIncentives: '$6,860',
    popular: false,
    specs: {
      panels: '12x 450W N-Type TOPCon Panels',
      inverter: 'SolarEdge Energy Hub 5kW',
      battery: 'Optional 5 kWh Storage Add-on',
      warranty: '25-Year Panel & 12-Year Inverter',
      efficiency: '22.8%'
    }
  },
  {
    id: 'res-pro',
    name: 'Residential Pro + Storage',
    capacity: '10.8 kW',
    outputPerYear: '15,600 kWh',
    idealFor: '3-5 Bedroom Homes ($200-$400/mo bill)',
    price: '$18,500',
    afterIncentives: '$12,950',
    popular: true,
    specs: {
      panels: '24x 450W Monocrystalline Panels',
      inverter: 'Tesla Solar Inverter 10kW',
      battery: '13.5 kWh Tesla Powerwall 2 Included',
      warranty: '25-Year Performance & 10-Year Battery',
      efficiency: '23.4%'
    }
  },
  {
    id: 'comm-grid',
    name: 'Commercial Max Grid',
    capacity: '50 kW',
    outputPerYear: '72,000 kWh',
    idealFor: 'Commercial Warehouses, Offices, Retail',
    price: '$72,000',
    afterIncentives: '$50,400',
    popular: false,
    specs: {
      panels: '110x 455W High-Density Commercial Panels',
      inverter: 'Dual SMA Sunny Tripower 25kW',
      battery: 'Scalable Commercial Battery Bank (50+ kWh)',
      warranty: '25-Year Commercial System Guarantee',
      efficiency: '24.1%'
    }
  }
];

export const INITIAL_LEADS = [
  {
    id: 'LEAD-901',
    name: 'Marcus Vance',
    email: 'm.vance@gmail.com',
    phone: '(555) 234-8901',
    address: '742 Evergreen Terrace, Springfield',
    bill: 340,
    roofType: 'Tile',
    status: 'New Lead',
    systemSize: '10.8 kW',
    date: '2026-07-24',
    estValue: '$18,500'
  },
  {
    id: 'LEAD-902',
    name: 'Sarah Lin',
    email: 'sarah.lin@techcorp.io',
    phone: '(555) 876-5432',
    address: '1204 Pine Ridge Rd, Austin TX',
    bill: 520,
    roofType: 'Metal',
    status: 'Site Survey',
    systemSize: '15.2 kW',
    date: '2026-07-23',
    estValue: '$24,000'
  },
  {
    id: 'LEAD-903',
    name: 'David & Ellen Miller',
    email: 'miller.family@yahoo.com',
    phone: '(555) 345-6789',
    address: '88 Oakwood Ave, Denver CO',
    bill: 210,
    roofType: 'Asphalt Shingle',
    status: 'Proposal Sent',
    systemSize: '7.2 kW',
    date: '2026-07-21',
    estValue: '$13,400'
  },
  {
    id: 'LEAD-904',
    name: 'Apex Logistics Warehouse',
    email: 'facility@apexlogistics.com',
    phone: '(555) 999-1122',
    address: '400 Industrial Pkwy, Phoenix AZ',
    bill: 2400,
    roofType: 'Flat TPO',
    status: 'Contract Signed',
    systemSize: '85.0 kW',
    date: '2026-07-18',
    estValue: '$115,000'
  },
  {
    id: 'LEAD-905',
    name: 'Robert Chen',
    email: 'rchen@gmail.com',
    phone: '(555) 444-3322',
    address: '55 Ocean View Dr, San Diego CA',
    bill: 290,
    roofType: 'Spanish Tile',
    status: 'Installed',
    systemSize: '9.6 kW',
    date: '2026-07-10',
    estValue: '$17,200'
  }
];

export const INITIAL_PROJECTS = [
  {
    id: 'PRJ-104',
    customer: 'Apex Logistics Warehouse',
    capacity: '85 kW Commercial',
    stage: 'Engineering & Permitting',
    progressPercent: 45,
    assignedInstaller: 'Crew Alpha (Lead: Mike Ross)',
    estimatedCompletion: '2026-08-15',
    checklist: [
      { step: 'Site Drone Mapping', completed: true },
      { step: 'Structural Engineering Approval', completed: true },
      { step: 'City Permit Application', completed: false },
      { step: 'Hardware Delivery', completed: false },
      { step: 'Grid Interconnection Approval', completed: false }
    ]
  },
  {
    id: 'PRJ-103',
    customer: 'David & Ellen Miller',
    capacity: '7.2 kW Residential',
    stage: 'Hardware Dispatch',
    progressPercent: 70,
    assignedInstaller: 'Crew Bravo (Lead: Carlos Diaz)',
    estimatedCompletion: '2026-07-30',
    checklist: [
      { step: 'Site Mapping', completed: true },
      { step: 'Structural Approval', completed: true },
      { step: 'City Permit Application', completed: true },
      { step: 'Hardware Delivery', completed: true },
      { step: 'Rooftop Mounting & Electrical', completed: false }
    ]
  },
  {
    id: 'PRJ-102',
    customer: 'Elena Rostova',
    capacity: '12.0 kW + Battery',
    stage: 'Final Inspection & PTO',
    progressPercent: 95,
    assignedInstaller: 'Crew Alpha (Lead: Mike Ross)',
    estimatedCompletion: '2026-07-26',
    checklist: [
      { step: 'Structural & Permit', completed: true },
      { step: 'Panel & Inverter Installation', completed: true },
      { step: 'Tesla Powerwall Wiring', completed: true },
      { step: 'City Inspection Passed', completed: true },
      { step: 'Permission to Operate (PTO) Issued', completed: false }
    ]
  }
];

export const LIVE_HOURLY_ENERGY_DATA = [
  { hour: '06:00', solarGen: 0.2, consumption: 1.5, batteryCharge: 30, gridExport: 0 },
  { hour: '08:00', solarGen: 2.1, consumption: 2.8, batteryCharge: 38, gridExport: 0 },
  { hour: '10:00', solarGen: 5.8, consumption: 2.2, batteryCharge: 65, gridExport: 1.4 },
  { hour: '12:00', solarGen: 8.9, consumption: 2.1, batteryCharge: 95, gridExport: 4.7 },
  { hour: '14:00', solarGen: 9.4, consumption: 2.4, batteryCharge: 100, gridExport: 7.0 },
  { hour: '16:00', solarGen: 6.7, consumption: 3.1, batteryCharge: 100, gridExport: 3.6 },
  { hour: '18:00', solarGen: 3.2, consumption: 4.2, batteryCharge: 90, gridExport: 0 },
  { hour: '20:00', solarGen: 0.4, consumption: 3.9, batteryCharge: 72, gridExport: 0 },
  { hour: '22:00', solarGen: 0.0, consumption: 2.1, batteryCharge: 55, gridExport: 0 }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Dr. Gregory Vance',
    location: 'San Jose, CA',
    role: 'Homeowner (10.8 kW + Powerwall)',
    beforeBill: '$380 / mo',
    afterBill: '$14 / mo',
    quote: 'HelioRay transformed our home energy. Our electric bill went from nearly $400 a month to just grid connection fees. During the last heatwave power outage, our battery kicked in seamlessly!',
    rating: 5,
    systemSize: '10.8 kW'
  },
  {
    id: 2,
    name: 'Anita Patel',
    location: 'Austin, TX',
    role: 'Commercial Facility Manager',
    beforeBill: '$3,200 / mo',
    afterBill: '$840 / mo',
    quote: 'We installed an 80 kW rooftop solar array across our distribution warehouse. The ROI calculator on their site was spot-on. The installation team completed everything ahead of schedule.',
    rating: 5,
    systemSize: '80.0 kW'
  },
  {
    id: 3,
    name: 'Jason & Karen Wright',
    location: 'Phoenix, AZ',
    role: 'Homeowner (7.5 kW System)',
    beforeBill: '$290 / mo',
    afterBill: '$18 / mo',
    quote: 'The interactive roof layout tool showed us exactly how many panels would fit on our tile roof. Super transparent process from initial drone survey to grid activation!',
    rating: 5,
    systemSize: '7.5 kW'
  }
];
