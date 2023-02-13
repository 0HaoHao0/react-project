import axios from "axios";
import Swal from "sweetalert2";

export const ContactCreate = async (
  contactName,
  contactPhone,
  contactEmail,
  contactContent
) => {
  let data;
  await Swal.fire({
    title: "Sending !!!",
    confirmButtonColor: "#3085d6",
    icon: "warning",
    html: "This pop-up will close when server response.",
    didOpen: () => {
      Swal.showLoading();
      axios({
        method: "post",
        url: "/api/Contact/Create",
        data: {
          name: contactName,
          phoneNumber: contactPhone,
          email: contactEmail,
          content: contactContent,
        },
      })
        .then((response) => {
          data = response;
          Swal.fire("Success!", "", "success");
        })
        .catch((error) => {
          // handle error
          console.log(error);
          Swal.fire("Error!!! You can't Submit", "", "error");
        });
    },
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.isDismissed) {
      console.log("I was closed by server response");
    }
  });
  return data;
};
