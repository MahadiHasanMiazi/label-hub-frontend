export const roleCheck = (role: number) => {
    var roleName = "";
    if (role === 1) {
      roleName = "ADMIN";
    } else if (role === 2) {
      roleName = "MANAGER";
    } else if (role === 3) {
      roleName = "ANNOTATOR";
    } else if (role === 4) {
      roleName = "VALIDATOR";
    } else if (role === 5) {
      roleName = "GUEST";
    }
    return roleName;
  };

  export const statusCheck = (status: number) => {
    var statusName = "";
    if (status === 1) {
      statusName = "Pending";
    } else if (status === 2) {
      statusName = "Active";
    } else if (status === 3) {
      statusName = "Deleted";
    } 
    return statusName;
  };