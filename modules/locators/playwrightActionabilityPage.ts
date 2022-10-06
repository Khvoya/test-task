export const playwrightActionabilityPage = {
    tableActions: 'tbody tr td:first-child',
    tableStates: 'table thead tr th:not(:first-child)',
    getValueLocator: (actionIndex: number, stateIndex: number) =>
        `tbody tr:nth-child(${actionIndex}) td:nth-child(${stateIndex})`,
}
