# This script analyzes datafiles to extract vehicle mass and drag coefficient data

import os
import pandas as pd
import numpy as np

data_dir = '/Users/arsmith/Downloads'

data = {}
for file in os.listdir(data_dir):
    if file[0] in '.$':
        continue

    if file[-3:] == 'csv':
        # print(f'reading file {file}')
        data[file[:2]] = pd.read_csv(os.path.join(data_dir, file))

year = ['Model Year', 'yr', 'MDLYR_DT']
mfr = [
    'Vehicle Manufacturer Name',
    'mfr name',
    'VI_MFR_NM',
]
model = [
    'Represented Test Veh Model',
    'carline',
    'CL_NM',
]
weight = [
    'ADFE Equiv. Test Weight (lbs.)',
    'etw',
    'VC_DSN_ETW_MSR',
    'weight',
    'Weight',
    'WEIGHT',
]

all_cols = year + mfr + model + weight

for yr, df in data.items():
    good_cols = []
    for col_name in df.columns:
        if col_name in all_cols:
            good_cols.append(col_name)

    data[yr] = df[good_cols]

weight_data = None
for df in data.values():
    if weight_data is None:
        weight_data = df.to_numpy()
        continue
    weight_data = np.concatenate((weight_data, df.to_numpy()), axis=0)

weight_data = pd.DataFrame(weight_data, columns=['year', 'make', 'model', 'weight'])
weight_data = weight_data.dropna(axis=0, subset=['weight'])

weight_data.make = weight_data.make.str.lower()
weight_data.model = weight_data.model.str.lower()


cda_cols = 'Make,Model,Year,Cd,Height (In),Width (In),Frontal Area (ft^2),CdA'
cda_cols = cda_cols.split(',')

cda_data = '''Acura	CL	1997 - 1999	0.34	54.7	70.1	21.6	7.33
Acura	CL	2000 - 2003	0.32	55.5	70.6	22.0	7.05
Acura	Integra	1994 - 2001	0.32	51.9	66.7	19.5	6.23
Acura	NSX	1995 - 2005	0.32	46.1	71.3	19.2	6.13
Acura	RSX	2002 - 2004	0.32	54.5	67.9	20.8	6.66
Acura	TSX	2004 - 2008	0.27	57.3	69.4		
Alfa Romeo	145	1994 - 2001	0.32	56.2	67.4	22.41	7.21
Aptera	2e	prototype	0.15			19.9	2.98
Audi	A2	1999 - 2003					6.63
Audi	A2 3L	2001 - 2003	0.25				5.86
Audi	A3	1996 - 2003	0.31	56.0	68.3	22.39	6.89
Audi	A4	1994 - 2001	0.29	55.7	68.1	21.85	6.35
Audi	A6	1997 - 2004	0.29	57.2	71.3	22.82	6.67
Audi	A8	1994 - 2002	0.28	56.6	74.0	24.22	6.78
Audi	TT	1998 - 2006	0.34	-	-	21.42	7.28
Audi	TT	2006 -	0.30	-	-	22.47	6.75
BMW	Compact	1993 - 2000	0.31		67.0	20.99	6.57
BMW	3-series	1990 - 1999	0.30			21.10	6.24
BMW	5-series	1995 - 2003	0.27	56.5	70.9	23.36	6.35
BMW	7-series	1994 - 2001	0.30	56.1	73.3	23.79	7.21
Buick	LeSabre	1991	0.36			24.19	7.5
Buick	Park Avenue	1991 - 1993	0.31	55.3	74.9	24.19	8.71
Buick	Park Avenue	1994 - 1996	0.31	55.1	74.1	23.52	7.29
Buick	Park Avenue	1997 - 2005		57.4	74.7		
Buick	Park Avenue	2006 - 20XX		58.3	74.8		
Buick	Regal GS	1991	0.36			22.41	8.07
Chevrolet	Astro Van	1995 - 2005	0.40	75.5	77.5	34.1	13.65
Chevrolet	Aveo	2004 - 2008	0.35	58.5	66	23.3	8.16
Chevrolet	Aveo Hatchback	2009	0.32	59.3	66.1	22.9	7.32
Chevrolet	Aveo Sedan	2009	0.32	58.9	67	23.0	7.37
Chevrolet	Camaro	1993 - 2002	0.34	51.3	74.1	22.0	7.48
Chevrolet	Cavalier	1995 - 2005	0.36	53.2	67.4	20.2	7.26
Chevrolet	Cobalt XFE	2008 - 2009	0.34	57.1	67.9	22.0	7.47
Chevrolet	Monte Carlo	1995 - 2000	0.36	53.8	72.5	22.6	8.14
Chevrolet	Volt	2011 - 2015	0.28	56.64	70.37	23.25	6.51
Chevrolet	Volt	2016 -	0.285	56.4	71.2	23.42	6.68
Chrysler	PT Cruiser	2000 - 2006	0.40	63.0	67.1	23.8	9.51
Chrysler	Sebring	1995 - 2000	0.32	53.0	69.7	20.8	6.65
Chrysler	Sebring Convertible	1996 - 2000	0.36	54.2	69.2	21.82	7.85
Chrysler	Voyager	1996 - 2000	0.37	68.5	75.6	30.14	11.19
Citroën	C4	2004 -	0.28	57.4	69.6		
Citroën	C8	1994 - 2003	0.34			28.95	9.79
Citroën	Saxo	1996 - 2003	0.34	54.3	62.8	19.7	6.66
Citroën	Xantia	1993 - 2001	0.31	54.0	69.1	21.85	6.67
Citroën	XM	1989 - 2000	0.30	54.8	70.6	22.82	6.78
Citroën	ZX	1991 - 1998	0.36			20.77	7.43
Daewoo	Espero	1990 - 1997	0.32	54.6	67.6	21.74	6.99
Daewoo	Nexia	1994 - 1997	0.34			20.99	7.21
Dodge	Avenger	2008-2009	0.326			25.15	8.2
Dodge	Caravan	1996-2000	0.35	68.6	76.8	30.7	10.76
Dodge	Magnum (RWD) SE	2005-2007	0.337	58.4	74.1	25.4	8.56
Dodge	Magnum (RWD) SXT	2005-2007	0.346	58.4	74.1	25.4	8.79
Dodge	Magnum (RWD) R/T	2005-2007	0.355	58.4	74.1	25.4	9.02
Dodge	Magnum (AWD) SXT, R/T	2005-2007	0.365	58.4	74.1	25.4	9.27
Dodge	Neon	1995-1999	0.33	54.9	67.5	21.6	7.13
Dodge	RAM 1500 QC	2002-2008	0.52			35.1	18.25
Dodge	RAM SRT10	2004-2006	0.45			34.6	15.57
Dodge	Shadow	1991-1994	0.42			21	8.82
Fiat	Bravo	1995 - 2001	0.32	55.9	68.9	22.06	7.10
Fiat	Cinquecento	1991 - 1998	0.33	56.6	58.7	19.37	6.35
Fiat	Punto	1993 - 1999	0.30	57.0	64.0	20.99	6.35
Fiat	Ulysse	1994 - 2003	0.34			28.95	9.79
Ford	Aspire	1994 - 1997	0.36	55.6	65.5	21.2	7.65
Ford	Escort (Euro)	1995 - 2000	0.32			20.88	6.67
Ford	Escort	1997 - 2002	0.36	52.3	67.4	19.8	7.14
Ford	Explorer II	1995 - 2001	0.43	68.0	70.2	32.93	14.21
Ford	F-150 Lightning	1999 - 2004	0.36	70.9	79.1	31.5	11.36
Ford	Fiesta	1995 - 2002	0.36			19.80	7.10
Ford	Fiesta	2011 -	0.33	58.0	67.8	22.9	7.57
Ford	Galaxy	1995 - 2000	0.32	67.9	74.2	28.84	9.15
Ford	Ka	1996 - 2008	0.35	54.8	64.2	20.23	7.10
Ford	Maverick	1988 - 1994	0.52	71.3	76.0	29.17	15.18
Ford	Mondeo	1996 - 2000	0.31			22.06	6.89
Ford	Mondeo Turnier	1996 - 2000	0.32			22.17	7.10
Ford	Ranger	2001	0.49	68.5	64.9	25.9	12.7
Ford	Scorpio	1985 - 1998	0.32	54.6	69.3	22.06	7.10
Ford	SVT Mustang Cobra	1994 - 2004	0.37	52.5	73.1	21.6	7.99
Ford	Thunderbird	1989 - 1997	0.31	52.8	72.0	21.4	6.63
Ford	Windstar I	1994 - 1998	0.35	68.0	75.4	30.03	10.55
General Motors	EV1	1996	0.19				3.96
Geo	Metro 4dr	1989 - 1994		53.5	62.7	19.6	0.00
Geo	Metro 4dr	1995 - 1997	0.32	55.4	62.6	19.5	6.24
Geo	Metro 2dr hatch	1989 - 1994		52.4	62.0	19.0	0.00
Geo	Metro 2dr hatch	1995 - 1997	0.34	54.7	62.6	20.0	6.79
Geo	Metro Convertible	1989 - 1994		52.0	62.7	19.0	0.00
GMC	Sierra XFE	2009	0.412	80.0	73.6	34.3	14.2
Honda	Accord Ex Coupe	1998 - 2002	0.34	55.1	70.3	21.8	7.41
Honda	Civic	1988 - 1991		53.5	65.9	20.6	0.00
Honda	Civic Hatch	1988 - 1991	0.33	52.4	65.6	20.1	6.63
Honda	Civic Coupe	1992 - 1995	0.32	50.9	66.9	19.9	6.36
Honda	Civic	2001 - 2005		56.9	67.7	22.5	0.00
Honda	Civic Coupe	2006 -	0.29	56.5	69.0	21.9	6.36
Honda	Civic Del Sol	1992 - 1997	0.35	49.4	66.7	18.5	6.49
Honda	Civic Hatch	1992 - 1995	0.31	50.9	66.9	19.9	6.16
Honda	Civic Hatch	1996 - 2000	0.36	54.1	67.1	21.8	7.62
Honda	Civic Sedan	1996 - 2000	0.32	54.7	67.1	21.4	6.85
Honda	Civic Hybrid	2003 - 2005	0.28	56.3	67.5	21.4	5.99
Honda	Civic Hybrid	2005 -	0.27	56.3	69.0	21.9	5.90
Honda	Civic SI	1996 - 2000	0.34	54.1	67.1	20.4	6.94
Honda	CRX	1984 - 1987	0.32	50.8	63.9	18.3	5.84
Honda	CRX	1988 - 1991	0.30	50.1	65.9	18.6	5.57
Honda	CRX HF	1988 - 1991	0.29	50.1	65.9	18.6	5.39
Honda	CR-Z	2010 -	0.30	54.9	68.5	21.9	6.58
Honda	Insight	2000 - 2006	0.25	53.3	66.7	20.0	5.00
Honda	Insight	2010 -	0.28	56.3	66.7	21.9	6.13
Honda	Fit	2006 - 2008	0.35	60.0	65.9	23.1	8.085
Honda	Fit	2009 -		60.0	66.7	23.3	0.00
Honda	Prelude	1997 - 2001	0.32	51.8	69.0	20.1	6.43
Honda	S2000	2000 -	0.33	50.6	68.9	19.6	6.47
Hyundai	Accent/Pony/Excel	1994 - 1999	0.31	54.9	63.8	20.56	6.35
Hyundai	Elantra	1991 - 1993		54.5	65.9	21.0	0.00
Hyundai	Elantra	1994 - 1995		52.0	66.1	20.1	0.00
Hyundai	Elantra	1996 - 2000	0.33	54.9	66.9	20.7	6.82
Hyundai	Elantra	2001 - 2006	0.34	56.1	67.9	21.4	7.29
Hyundai	Elantra	2007 -	0.32	58.3	69.9	22.9	7.34
Hyundai	Elantra touring	2007 -	0.33	59.8	69.5	23.4	7.71
Hyundai	Elantra wagon	1996 - 1997	0.33	57.4	66.9	21.6	7.13
Hyundai	Elantra wagon	1998 - 2000	0.33	58.8	66.9	22.1	7.30
Hyundai	Sonata	2006 -	0.32	58.0	72.1	23.5	7.53
Hyundai	Tiburon GT	2002 -	0.32	52.3	69.3	20.4	6.52
Infiniti	G20	1991-1996	0.30	54.7	66.7	21.28	6.38
Infiniti	G20	1999-2002	0.30	55.1	66.7	21.44	6.43
Infiniti	Q45	2002-2006	0.30	58.7	72.6	24.9	7.46
Jeep	Cherokee	1984 - 2001	0.52	64.0	67.9	24.54	12.81
Jeep	Grand Cherokee	1993 - 1998	0.42	64.9	69.2	25.94	10.87
Jeep	Liberty	2012	0.394	71.0	72.3	30.21	12.0
Jeep	Wrangler TJ-Hardtop	1997-2005	0.55	69.8	68.3	27.81	15.3
Jeep	Wrangler TJ-Soft Top	1997-2005	0.58	71.2	68.3	28.37	16.45
Kia	Picanto	2004-2011	0.34	58.3	62.8		
Lancia	Delta HPE (3-door)	1993 - 1999	0.33	56.0	69.3	22.49	7.43
Lexus	LS 400	1994 - 2000	0.27	56.0	72.0	24.00	6.46
Mazda	323 C	1994 - 1998	0.33	54.3	65.7	21.31	6.99
Mazda	626	1992 - 1997	0.29	53.9	68.9	21.63	6.24
Mazda	Miata	1998 - 2005	0.38	47.3	66.1	17.6	6.68
Mazda	MX-3	1992 - 1995	0.32	51.6	66.7	19.4	6.20
Mazda	RX-7	1992 - 2002	0.33	48.4	68.9	18.8	6.19
Mazda	RX-8	2003 - 2012	0.30	52.8	69.7	21.47	6.44
Mazda	Xedos 6	1992 - 1999	0.31			20.34	6.35
Mazda	Xedos 9/Millenia	1993 - 2003	0.28	54.9	69.7	23.46	6.57
Mercedes-Benz	C-class	1993 - 2000	0.30	56.1	67.7	22.06	6.67
Mercedes	CL500	1998 - 2000	0.28	55.0	73.1	23.9	6.69
Mercedes-Benz	E-class	1995 - 2002	0.27	56.7	70.8	23.25	6.24
Mercedes-Benz	G-class	1990 -	0.53	72.3	69.3	31.64	16.79
Mercedes-Benz	S-class	1991 - 1999	0.31			25.62	7.96
Mercedes	SL600	1989 - 2002	0.45	50.7	71.3	21.2	9.54
Mercedes-Benz	Vito	1996 - 2003	0.34			34.27	11.62
Mercury	Cougar	1999 - 2002	0.31	52.2	69.6	20.4	6.34
Mini	Mini Cooper S	2001 - 2006	0.33	55.8	66.5	21.3	7.03
Mitsubishi	Colt	1995 - 2002	0.30	54.5	66.0	21.53	6.46
Mitsubishi	Eclipse GS-T	1995 - 1999	0.29	51.0	68.3	20.4	5.92
Mitsubishi	Eclipse GTS	2000 - 2005	0.35	51.6	68.9	20.4	7.14
Mitsubishi	i-MiEV	2012 -	0.35	63.6	62.4	23.2	8.10
Mitsubishi	Lancer	2000 - 2007	0.30	54.1	66.7	21.0	6.31
Mitsubishi	Mirage Coupe	1991 - 1996	0.32	51.4	66.5	19.2	6.15
Mitsubishi	Mirage Hatch	2014 - 2016	0.28	59.1	65.6	21.97	6.15
Mitsubishi	Mirage Hatch	2017 -	0.27	59.1	65.6	21.97	5.93
Mitsubishi	Pajero	1991 - 1999	0.49	72.8	66.7	27.23	13.02
Nissan	200SX SE	1991 - 1994	0.30	50.8	66.5	19.0	5.70
Nissan	200SX SE-R	1995 - 1999	0.34	54.2	66.6	20.3	6.90
Nissan	300ZX Turbo	1990 - 1996	0.31	49.2	70.5	19.5	6.05
Nissan	350Z	2002 -	0.31	51.9	71.5	20.9	6.47
Nissan	Almera	1995 - 2000	0.30	54.9	66.5	20.45	6.13
Nissan	Altima	1993 - 1997	0.34	55.9	67.1	21.1	7.17
Nissan	Altima	1998 - 2001	0.32	55.9	69.1	21.7	6.95
Nissan	Altima	2002 - 2006	0.32	57.9	70.4	22.9	7.34
Nissan	Altima coupe	2007 -	0.31	55.3	70.7	22.0	6.82
Nissan	Altima hybrid	2007 -	0.30	58.1	69.6	22.7	6.82
Nissan	Altima sedan	2007 -	0.31	57.9	70.7	23.0	7.14
Nissan	Cube	2008 -	0.35	65.0	66.7	25.32	8.86
Nissan	Leaf	2011 -	0.28	61.0	69.7	24.8	6.94
Nissan	Maxima	1995 - 1999	0.32	55.7	69.7	22.51	7.20
Nissan	Micra	1992 - 2003	0.35			19.59	6.89
Nissan	Murano	2003 - 2007	0.39	66.5	74.0	28.71	11.20
Nissan	Murano	2008 -	0.39	67.3	74.0	29.05	11.32
Nissan	NX2000	1991 - 1993	0.32	51.8	66.1	20	6.39
Nissan	Patrol GR	1987 - 1998	0.52	71.3	76.0	29.17	15.18
Nissan	Primera	1995 - 1999	0.29			21.10	6.13
Nissan	Sentra	1991 - 1994	0.35	53.0	65.6	19.6	6.84
Nissan	Sentra	1995 - 1999	0.33	54.5	66.6	20.4	6.74
Nissan	Sentra	2000 - 2006	0.33	55.5	67.3	21.0	6.93
Nissan	Sentra	2007 -	0.35	59.5	70.5	23.6	8.26
Nissan	Terrano II	1996 - 2004	0.44	67.1	68.7	29.38	12.92
Nissan	Versa	2004 -	0.31	60.4	66.7	22.7	7.03
Opel	Astra	1991 - 1998	0.32			21.20	6.78
Opel	Astra Caravan	1991 - 1998	0.33			21.74	7.10
Opel	Corsa B	1992 - 2000	0.36	56.7	63.4	20.23	7.21
Opel	Corsa C	2000 - 2006	0.32	56.7	64.8	21.1	6.75
Opel	Calibra 2.0i	1989 - 1997	0.26	52	66.5	20.8	5.40
Opel	Omega B	1994 - 1999	0.29	57.3	70.3	23.14	6.78
Opel	Sintra	1996 - 1999	0.34			30.14	10.22
Opel	Tigra	1994 - 2001	0.31			19.15	5.94
Opel	Vectra A	1988 - 1995	0.29	55.1	66.9	21.9	6.36
Opel	Vectra B	1995 - 2002	0.28	56.0	67.0	21.74	6.13
Peugeot	106	1991 - 2004	0.32	53.9	62.6	19.48	6.24
Peugeot	206	1998 -	0.33				
Peugeot	207	2006 -	0.30				
Peugeot	207 Economique	2009 -	0.274				
Peugeot	306	1993 - 2002	0.32			20.66	6.67
Peugeot	307 SW	2001 - 2008	0.33	61.4	70	27.46	9.06
Peugeot	308	2008 -	0.29				
Peugeot	406	1995 - 2004	0.31	55.0	69.0	22.06	6.78
Peugeot	806	1994 - 2002	0.34			28.95	9.79
Pontiac	Bonneville	1992 - 1997	0.36	55.7	74.5	24.3	8.75
Pontiac	Bonneville	1998 - 1999		56.0	74.4	24.3	
Pontiac	Bonneville SE	2000 - 2001		56.0	74.2	24.3	
Pontiac	Bonneville SLE & SSEi	2000 - 2001		56.4	74.2	24.4	
Pontiac	Bonneville	2002 - 2005		56.6	74.2	24.5	
Pontiac	Fiero	1986	0.36			18.72	6.75
Pontiac	Grand AM GT	1992	0.34			21.12	7.18
Pontiac	Grand AM SE	1992	0.34			20.82	7.08
Pontiac	Grand Prix	1991	0.34			22.32	7.59
Pontiac	Grand Prix	1998 - 2003		54.7	72.7	23.197	
Pontiac	Trans Am	1985 - 1989	0.29				
Pontiac	Firebird Trans Am	1993 - 2002	0.34	52.0	74.5	22.0	7.48
Pontiac	Trans Sport	1990 - 1996	0.30	65.7	74.6	28.6	8.58
Pontiac	Vibe	2003	0.33				
Porsche	914	1969 - 1976	0.36			17.2	6.19
Renault	Clio	1990 - 1998	0.33			20.02	6.57
Renault	Espace II	1991 - 1997	0.32			27.88	8.93
Renault	Espace III	1997 - 2003	0.31			27.77	8.61
Renault	Laguna	1993 - 2001	0.30	56.4	69.0	22.28	6.67
Renault	Megane	1995 - 2002	0.32			21.42	6.89
Renault	Twingo	1992 - 2007	0.35			20.99	7.32
Rover	214	1995-1999	0.33	56	67	21.5	7.1
Saab	900 (Classic)	1979-1993	0.34	56.25	66.5	21.82	7.42
Saab	9000 CS	1992 - 1998	0.32	55.9	69.4	22.39	7.21
Saab	Sonett III (Model 97)	1970 - 1974	0.31	46.8	59.1	15.15	4.70
Saturn	SC	1991 - 1996	0.32	50.6	67.6	20.0	6.39
Saturn	SC	1996 - 2002	0.31	53.0	67.3	20.8	6.45
Saturn	SC2	1997 - 2002	0.33	52.2	67.3	20.9	6.90
Saturn	SL	1991 - 1995	0.34	52.5	67.6	20.7	7.04
Saturn	SL	1996 - 2002	0.32	54.8	66.6	21.3	6.81
Saturn	SW	1993 - 1995		53.7	67.6	21.2	
Saturn	SW	1996 - 2001	0.36	55.0	66.5	21.3	7.68
Scion	FR-S	2012 -	0.27	50.6	69.9	20.6	5.57
Scion	Tc	2005 -	0.32	55.7	69.1	21.6	6.93
Scion	Xa	2004 - 2007	0.31	60.2	66.7	22.6	7.00
Scion	Xb	2004 - 2007	0.35	64.6	66.5	24.2	8.46
Scion	Xb	2008 -	0.32	64.7	69.3	25.2	8.07
Scion	Xd	2008 -	0.32	60.0	67.9	22.9	7.33
Seat	Cordoba	1993 - 2002	0.32	55.4	65.0	20.99	6.67
Seat	Ibiza	1993 - 1999	0.33			20.88	6.89
Seat	Toledo	1991 - 1998	0.32	56.1	65.4	21.10	6.78
Škoda	Felicia	1994 - 2001	0.346	55.7	64.37	20.91	7.23
Škoda	Octavia	1996 -	0.32			22.17	7.10
Subaru	Impreza 2.5RS	1993 - 2001	0.36	55.5	67.1	20.9	7.54
Subaru	Impreza WRX	2002 - 2007	0.33	56.7	68.1	22.63	7.47
Subaru	Legacy	1994 - 1999	0.35			23.25	8.18
Subaru	Legacy	2009	0.31	56.5	68.1	22.44	6.96
Subaru	Legacy Wagon	1995 - 1999	0.32	57.1	67.5	22.5	7.20
Subaru	Legacy Outback Wagon	1995 - 1999	0.32	63.0	67.0	24.6	7.87
Subaru	Legacy Outback Wagon	2000 - 2004	0.32	58.3	68.7	23.4	7.48
Subaru	Outback Wagon	2005 - 2009	0.31	58.1	68.1	23.1	7.15
Subaru	Outback Wagon	2010 -	0.37	65.7	71.7	27.5	10.16
Subaru	Loyale Wagon	1988 - 1994	0.38	53.0	65.4	19.75	7.50
Toyota	Camry	1991 - 1996	0.31			22.06	6.80
Toyota	Camry Solara	1999 - 2003	0.36	55.1	71.1	22.0	7.93
Toyota	Carina	1996 - 2001	0.30	54.9	66.7	20.99	6.35
Toyota	Celica GT-S	1994 - 1999	0.34	50.1	68.3	19.2	6.54
Toyota	Celica GT	2000 - 2006	0.32	51.4	68.3	20.5	6.55
Toyota	Corolla	1993 - 1997	0.33	53.5	66.3	20.0	6.58
Toyota	Corolla	1998 - 2002	0.31	54.5	66.7	20.4	6.34
Toyota	Corolla	2003 - 2008	0.30	58.5	66.9	22.0	6.60
Toyota	Corolla	2009 -	0.29	57.7	69.3	22.5	6.52
Toyota	Echo	2000 - 2005	0.29	59.4	65.4	21.9	6.34
Toyota	iQ 3dr	2010 -	0.299			23.1	6.89
Toyota	Matrix	2003 - 2008	0.32	61.6	69.9	24.2	7.75
Toyota	Matrix	2009 -	0.33	61.0	69.5	23.8	7.87
Toyota	MR2	1985 - 1989	0.32	49.2	65.5	18.1	5.80
Toyota	MR2	1991 - 1995	0.31	48.6	66.9	18.3	5.67
Toyota	MR-Spyder	1999 - 2007	0.31	48.8	66.7	18.3	5.68
Toyota	Paseo	1992 - 1995	0.32	50.5	65.2	18.5	5.93
Toyota	Paseo	1996 - 1998	0.32	51.0	65.4	18.8	6.00
Toyota	Previa	1990-2000	0.33	69.0	70.9	28.5	9.42
Toyota	Prius	2000 - 2003	0.29	57.6	66.7	21.6	6.27
Toyota	Prius	2004 - 2009	0.26	58.7	67.9	22.4	5.83
Toyota	Prius	2010 - 2015	0.25	58.3	68.7	23.4	5.84
Toyota	Prius C	2012 -	0.28	56.9	66.7	22.1	6.20
Toyota	Sienna	2011 -	0.309				
Toyota	Supra	1993 - 2002	0.32	50.2	71.3	20.1	6.44
Toyota	Tercel	1991 - 1994	0.36	53.1	64.8	19.4	6.97
Toyota	Tercel	1995 - 1999	0.32	53.2	65.4	19.6	6.26
Toyota	Yaris	2007 - 2013	0.29	56.5	66.5	21.1	6.13
Toyota	Yaris	2014 -	0.29	59.4	66.7	23.1	6.70
Volkswagen	1L Concept		0.15	39.6	49.2	11.0	1.65
Volkswagen	XL1	2014 -	0.189	45.4	65.6	15.87	3.00
Volkswagen	Beetle	1998 -	0.38	59.5	67.9	22.7	8.64
Volkswagen	Beetle	1959 - 1979	0.48	0	0	0	0
Volkswagen	Caravelle/Transporter	1990 - 2003	0.37			33.37	12.27
Volkswagen	Golf	1997 - 2003	0.32			21.31	6.89
Volkswagen	Golf Variant	1997 - 2003	0.34			22.06	7.43
Volkswagen	Jetta	1993 - 1999	0.30	56.1	66.7	21.0	6.31
Volkswagen	Jetta	1986-1992	0.36	55.7	65.5	21.79	7.84
Volkswagen	Jetta sedan	2000 - 2005	0.30	56.7	68.3	21.8	6.54
Volkswagen	Jetta	2006 -	0.31	57.4	70.1	22.6	7.02
Volkswagen	Jetta wagon	2000 - 2005	0.30	58.5	68.3	22.5	6.74
Volkswagen	Passat	1995 - 1997	0.31	56.4	67.5	21.4	6.64
Volkswagen	Passat Wagon	1995 - 1997	0.33	58.7	67.5	22.3	7.36
Volkswagen	Passat Wagon B5	2000	0.27	57.5	68.5	22.97	6.20
Volkswagen	Polo	1994 - 2002	0.33			20.45	6.67
Volkswagen	Sharan	1995 - 2000	0.32	69.4	71.3	28.84	9.15
Volkswagen	Vento/Jetta	1992 - 1999	0.32	56.3	66.5	21.42	6.89
Volvo	850	1992 - 1997	0.32	55.7	69.3	23.03	7.43
Volvo	940	1990 - 1998	0.34	55.5	69.3	23.14	7.86
Volvo	C70 Coupe	1997 - 2005	0.32	55.1	72.0	22.3	7.14
Volvo	V70/V70XC	1996 - 2000	0.32	56.2	69.3	22.7	7.26
Volvo	V70/V70XC	2001 - 2009	0.30	57.6	71.0	24.0	7.20'''

cda = [line.split('\t') for line in cda_data.split('\n')]

res = []
for i, line in enumerate(cda):
    if not line[2] or not line[2][0].isnumeric():
        continue

    start_year = line[2][:4]
    if len(line[2]) >= 8:
        end_year = line[2][-4:]
    else:
        end_year = 2023

    res.append(line[:2] + [start_year, end_year] + line[3:])

cda = []
for line in res:
    if not (line[-1] and line[0] and line[1]):
        continue

    cda_line = [line[0].lower(), line[1].lower()]

    for i in range(int(line[2]), int(line[3]) + 1):
        cda.append([i] + cda_line + [line[-1]])

cda = pd.DataFrame(cda, columns=['year', 'make', 'model', 'cda'])

cda.cda = cda.cda.astype(float)
cda.year = cda.year.astype(int)
weight_data.weight = weight_data.weight.astype(float)
weight_data.year = weight_data.year.astype(int)

makes = list(cda.make)
models = list(cda.model)
for i in range(len(makes)):

    if '/' in makes[i]:
        makes[i] = makes[i].split('/')[0]
    if ' ' in makes[i]:
        makes[i] = makes[i].split(' ')[0]

    if '/' in models[i]:
        models[i] = models[i].split('/')[0]
    if ' ' in models[i]:
        models[i] = models[i].split(' ')[0]

cda.make = makes
cda.model = models

cda_on_m = np.empty(len(cda)) * np.nan

for i in range(len(cda)):
    print(f'{i}/{len(cda)}')
    year, make, model = cda.iloc[i].year, cda.iloc[i].make, cda.iloc[i].model

    sub_df = weight_data[weight_data.year == year][weight_data.make.str.contains(make)][
        weight_data.model.str.contains(model)
    ]

    if sub_df.empty:
        continue

    cdaonm = cda.iloc[i].cda / (sub_df.iloc[0].weight * 0.45359237)
    if cdaonm > 1e-6:
        cda_on_m[i] = cdaonm

cda['cda_on_m'] = cda_on_m
cda = cda.dropna(axis=0, subset=['cda_on_m'])
cda.to_csv('cda_on_m.csv')
