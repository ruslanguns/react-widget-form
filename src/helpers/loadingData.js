import Swal from "sweetalert2/src/sweetalert2";

export const loadingData = (title, html) => {
  Swal.fire({
    title,
    html,
    onBeforeOpen: () => {
      Swal.showLoading();
    },
  });
};