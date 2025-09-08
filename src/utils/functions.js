export const isNull = (field) => {
    return (
        field === undefined ||
        field === "undefined" ||
        field === "" ||
        field === null ||
        field === "null"
    ); // || !!!field;
};