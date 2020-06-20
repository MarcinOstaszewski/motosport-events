export const path = cubicCurve => {
    const {initAxis, initCtrPoint, endCtrPoint, endAxis } = cubicCurve;
    return `
        M${initAxis.x} ${initAxis.y}
        C ${initCtrPoint.x } ${initCtrPoint.y}
        ${endCtrPoint.x} ${endCtrPoint.y}
        ${endAxis.x} ${endAxis.y}
    `;
}