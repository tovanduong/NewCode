import * as ActionType from "./ActionType";
import { baseUrl } from "../shared/baseUrl";

export const fetchStaff = () => (dispatch) => {
  dispatch(staffLoading(true));
  return fetch(baseUrl + "staffs")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((staff) => dispatch(addStaffs(staff)))
    .catch((error) => dispatch(StaffsFailed(error.message)));
};

export const staffLoading = () => ({
  type: ActionType.STAFFS_LOADING,
});

export const StaffsFailed = (errmess) => ({
  type: ActionType.STAFFS_FAILED,
  payload: errmess,
});

export const addStaffs = (staff) => ({
  type: ActionType.ADD_STAFFS,
  payload: staff,
});

// API reponsive => dispatch vào store => update state => truyển thành props component => render UI

export const fetchDepartments = () => (dispatch) => {
  dispatch(departmentsLoading(true));
  return fetch(baseUrl + "departments")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((departments) => dispatch(addDepartments(departments)))
    .catch((error) => dispatch(departmentsFailed(error.message)));
};

export const departmentsLoading = () => ({
  type: ActionType.DEPARTMENTS_LOADING,
});

export const departmentsFailed = (errmess) => ({
  type: ActionType.DEPARTMENTS_FAILED,
  payload: errmess,
});

export const addDepartments = (departments) => ({
  type: ActionType.ADD_DEPARTMENTS,
  payload: departments,
});

export const fetchSalary = () => (dispatch) => {
  dispatch(salaryLoading(true));
  return fetch(baseUrl + "staffsSalary")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((salary) => dispatch(addSalary(salary)))
    .catch((error) => dispatch(salaryFailed(error.message)));
};

export const salaryLoading = () => ({
  type: ActionType.SALARY_LOADING,
});

export const salaryFailed = (errmess) => ({
  type: ActionType.SALARY_FAILED,
  payload: errmess,
});

export const addSalary = (salary) => ({
  type: ActionType.ADD_SALARY,
  payload: salary,
});

export const fetchDepartmentStaff = (id) => (dispatch) => {
  dispatch(staffDepartmentLoading(true));
  return fetch(baseUrl + "departments/" + id)
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((staff) => dispatch(addStaffDepartments(staff)))
    .catch((error) => dispatch(StaffDepartmentsFailed(error.message)));
};

export const staffDepartmentLoading = () => ({
  type: ActionType.STAFF_DEPARTMENTS_LOADING,
});

export const StaffDepartmentsFailed = (errmess) => ({
  type: ActionType.STAFF_DEPARTMENTS_FAILED,
  payload: errmess,
});

export const addStaffDepartments = (staff) => ({
  type: ActionType.ADD_STAFF_DEPARTMENTS,
  payload: staff,
});

export const postStaff =
  (
    id,
    name,
    doB,
    salaryScale,
    startDate,
    departmentId,
    annualLeave,
    overTime,
    image
  ) =>
  (dispatch) => {
    const newStaff = {
      id: id,
      name: name,
      doB: doB,
      salaryScale: salaryScale,
      startDate: startDate,
      departmentId: departmentId,
      annualLeave: annualLeave,
      overTime: overTime,
      image: image,
    };
    newStaff.date = new Date().toISOString();

    return fetch(baseUrl + "staffs", {
      method: "POST",
      body: JSON.stringify(newStaff),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    })
      .then(
        (response) => {
          if (response.ok) {
            return response;
          } else {
            var error = new Error(
              "Error " + response.status + ": " + response.statusText
            );
            error.response = response;
            throw error;
          }
        },
        (error) => {
          throw error;
        }
      )
      .then((response) => response.json())
      .then((response) => dispatch(addNewStaff(response)))
      .catch((error) => {
        console.log("post staff", error.message);
        alert("Your comment could not be posted\nError: " + error.message);
      });
  };

export const addNewStaff = (newStaff) => ({
  type: ActionType.ADD_NEWSTAFFS,
  payload: newStaff,
});

export const patchStaff = (
  id,
  name,
  doB,
  salaryScale,
  startDate,
  departmentId,
  annualLeave,
  overTime,
  image
) => {
  return (dispatch) => {
    const staff = {
      id: id,
      name: name,
      doB: doB,
      salaryScale: salaryScale,
      startDate: startDate,
      departmentId: departmentId,
      annualLeave: annualLeave,
      overTime: overTime,
      image: image,
    };
    staff.date = new Date().toISOString();

    return fetch(baseUrl + "staffs", {
      method: "PATCH",
      body: JSON.stringify(staff),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    })
      .then(
        (response) => {
          if (response.ok) {
            return response;
          } else {
            var error = new Error(
              "Error " + response.status + ": " + response.statusText
            );
            error.response = response;
            throw error;
          }
        },
        (error) => {
          throw error;
        }
      )
      .then((response) => response.json())
      .then((response) => dispatch(updateStaff(response)))
      .catch((error) => {
        console.log("update staff", error.message);
        alert("Error: " + error.message);
      });
  };
};

export const updateStaff = (updateStaff) => ({
  type: ActionType.UPDATE_STAFF,
  payload: updateStaff,
});

export const deleteStaff = (id) => (dispatch) => {
  const staff = {
    id: id,
  };
  staff.date = new Date().toISOString();
  return fetch(baseUrl + "staffs/" + id, {
    method: "DELETE",
    body: JSON.stringify(staff),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((response) => {
      dispatch(delStaff(response));
    })
    .catch((error) => {
      console.log("update staff", error.message);
      alert("Error: " + error.message);
    });
};

export const delStaff = (staffs) => ({
  type: ActionType.DELETE_STAFF,
  payload: staffs,
});
