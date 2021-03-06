interface ActivationData {
    [key: string]: {
        [key: string]: {
            type: "up" | "down";
            rdRequirementId: number;
            data: {
                [key: number]: number
            }
        }
    };
}

export const activationData: ActivationData = {
    "Wind001": {
        "2021-06-01": {
            type: "down",
            rdRequirementId: 4,
            data: {
                51: 1.5,
                52: 1.5,
                53: 1.5,
                54: 1.5,
                55: 1.5,
                56: 1.5,
                57: 1.5,
                58: 1.5,
                59: 1.5,
                60: 1.5,
                61: 1.5,
                62: 1.5,
                63: 1.5,
                64: 1.5,
                65: 1.5,
                66: 1.5,
                67: 1.5,
                68: 1.5,
                69: 1.5,
                70: 1.5,
                71: 1.5,
                72: 1.5,
                73: 1.5,
                74: 1.5,
                75: 1.5,
                76: 1.5,
                77: 1.5,
                78: 1.5,
                79: 1.5,
                80: 1.5,
                81: 1.5,
                82: 1.5,
                83: 1.5,
                84: 1.5,
                85: 1.5,
                86: 1.5,
                87: 1.5,
                88: 1.5,
                89: 1.5,
                90: 1.5,
                91: 1.5,
                92: 1.5,
                93: 1.5,
                94: 1.5,
                95: 1.5,
                96: 1.5,
            }
        },
        "2021-06-03": {
            rdRequirementId: 5,
            type: "down",
            data: {
                51: 1.5,
                52: 1.5,
                53: 1.5,
                54: 1.5,
                55: 1.5,
                56: 1.5,
                57: 1.5,
                58: 1.5,
                59: 1.5,
                60: 1.5,
                61: 1.5,
                62: 1.5,
                63: 1.5,
                64: 1.5,
                65: 1.5,
                66: 1.5,
                67: 1.5,
                68: 1.5,
                69: 1.5,
                70: 1.5,
                71: 1.5,
                72: 1.5,
                73: 1.5,
                74: 1.5,
                75: 1.5,
                76: 1.5,
                77: 1.5,
                78: 1.5,
                79: 1.5,
                80: 1.5,
                81: 1.5,
                82: 1.5,
                83: 1.5,
                84: 1.5,
                85: 1.5,
                86: 1.5,
                87: 1.5,
                88: 1.5,
                89: 1.5,
                90: 1.5,
                91: 1.5,
                92: 1.5,
                93: 1.5,
                94: 1.5,
                95: 1.5,
                96: 1.5,
            }
        },
    },
    "Wind002": {
        "2021-06-05": {
            rdRequirementId: 2,
            type: "down",
            data: {
                51: 1.5,
                52: 1.5,
                53: 1.5,
                54: 1.5,
                55: 1.5,
                56: 1.5,
                57: 1.5,
                58: 1.5,
                59: 1.5,
                60: 1.5,
                61: 1.5,
                62: 1.5,
                63: 1.5,
                64: 1.5,
                65: 1.5,
                66: 1.5,
                67: 1.5,
                68: 1.5,
                69: 1.5,
                70: 1.5,
                71: 1.5,
                72: 1.5,
                73: 1.5,
                74: 1.5,
                75: 1.5,
                76: 1.5,
                77: 1.5,
                78: 1.5,
                79: 1.5,
                80: 1.5,
                81: 1.5,
                82: 1.5,
                83: 1.5,
                84: 1.5,
                85: 1.5,
                86: 1.5,
                87: 1.5,
                88: 1.5,
                89: 1.5,
                90: 1.5,
                91: 1.5,
                92: 1.5,
                93: 1.5,
                94: 1.5,
                95: 1.5,
                96: 1.5,
            }
        }
    },
    "Sun003": {
        "2021-06-02": {
            rdRequirementId: 3,
            type: "down",
            data: {
                37: 0,
                38: 0,
                39: 0,
                40: 0,
                41: 0,
                42: 0,
                43: 0,
                44: 0,
            }
        }
    },
    "Bio006": {
        "2021-06-05": {
            rdRequirementId: 1,
            type: "up",
            data: {
                1: 0.5,
                2: 0.5,
                3: 0.5,
                4: 0.5,
                5: 0.5,
                6: 0.5,
                7: 0.5,
                8: 0.5,
                9: 0.5,
                10: 0.5,
                11: 0.5,
                12: 0.5,
                13: 0.5,
                14: 0.5,
                15: 0.5,
                16: 0.5,
                17: 0.5,
                18: 0.5,
                19: 0.5,
                20: 0.5,
                21: 0.5,
                22: 0.5,
                23: 0.5,
                24: 0.5,
                25: 0.5,
                26: 0.5,
                27: 0.5,
                28: 0.5,
                29: 0.5,
                30: 0.5,
            }
        }
    },
    "Wind008": {
        "2021-06-02": {
            rdRequirementId: 6,
            type: "down",
            data: {
                52: 0,
                53: 0,
                54: 0,
                55: 0,
                56: 0,
                57: 0,
                58: 0,
                59: 0,
                60: 0,
                61: 0,
                62: 0,
                63: 0,
                64: 0,
                65: 0,
                66: 0,
                67: 0,
                68: 0,
                69: 0,
                70: 0,
                71: 0,
                72: 0,
                73: 0,
                74: 0,
                75: 0,
                76: 0,
                77: 0,
                78: 0,
                79: 0,
                80: 0,
            }
        }
    },
    "Bio012": {
        "2021-06-03": {
            rdRequirementId: 7,
            type: "up",
            data: {
                1: 0.525,
                2: 0.525,
                3: 0.525,
                4: 0.525,
                5: 0.525,
                6: 0.525,
                7: 0.525,
                8: 0.525,
                9: 0.525,
                10: 0.525,
                11: 0.525,
                12: 0.525,
                13: 0.525,
                14: 0.525,
                15: 0.525,
                16: 0.525,
                17: 0.525,
                18: 0.525,
                19: 0.525,
                20: 0.525,
                21: 0.525,
                22: 0.525,
                23: 0.525,
                24: 0.525,
            }
        }
    },
    "Wind014": {
        "2021-06-04": {
            rdRequirementId: 8,
            type: "down",
            data: {
                24: 0,
                25: 0,
                26: 0,
                27: 0,
                28: 0,
                29: 0,
                30: 0,
                31: 0,
                32: 0,
                33: 0,
                34: 0,
                35: 0,
                36: 0,
                37: 0,
                38: 0,
                39: 0,
                40: 0,
                41: 0,
                42: 0,
                43: 0,
                44: 0,
                45: 0,
                46: 0,
                47: 0,
                48: 0,
                49: 0,
                50: 0,
                51: 0,
                52: 0,
                53: 0,
                54: 0,
                55: 0,
                56: 0,
                57: 0,
                58: 0,
                59: 0,
                60: 0,
            }
        }
    },
    "Sun016": {
        "2021-06-05": {
            rdRequirementId: 9,
            type: "down",
            data: {
                50: 0,
                51: 0,
                52: 0,
                53: 0,
                54: 0,
                55: 0,
                56: 0,
                57: 0,
                58: 0,
                59: 0,
            }
        }
    },
    "Sun017": {
        "2021-06-05": {
            rdRequirementId: 10,
            type: "down",
            data: {
                50: 0,
                51: 0,
                52: 0,
                53: 0,
                54: 0,
                55: 0,
                56: 0,
                57: 0,
                58: 0,
                59: 0,
            }
        }
    },
};

interface ActivationEntry {
    powerplant: string;
    type: "up" | "down";
    power: number;
    rdRequirementId: number;
}

export interface ActivationsPerDay {
    [date: string]: {
        [quarter: number]: ActivationEntry[]
    };
}

const transformActivationData = (): ActivationsPerDay => {
    let days = [];
    Object.keys(activationData).forEach(kw => {
        days = [...days, ...Object.keys(activationData[kw])];
    });
    days = Array.from(new Set(days)).filter((day) => day !== "type").sort();

    return days.reduce((acc, day) => {
        let dayRes: { [quarter: number]: ActivationEntry[] } = {};
        Object.keys(activationData).forEach(kw => {
            const kw_data = activationData[kw];
            const dayData = kw_data[day];
            if (dayData) {
                Object.keys(dayData.data).forEach(quarter => {
                    let quarterEntry: ActivationEntry[] = dayRes[quarter];
                    if (!quarterEntry) {
                        quarterEntry = [];
                        dayRes[quarter] = quarterEntry;
                    }

                    quarterEntry.push({powerplant: kw, type: dayData.type, power: dayData[quarter], rdRequirementId: dayData.rdRequirementId});
                });
            }
        });
        return {...acc, [day]: dayRes};
    }, {});
};

export const activationDataPerDay: ActivationsPerDay = transformActivationData();