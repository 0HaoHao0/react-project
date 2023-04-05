import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { deleteRoomCategory, getRoomCategories, getRoomDetail, getRoomTypes, updateRoom } from "../../../services/admin/room/apiRoom";
import { AutoComplete } from "primereact/autocomplete";

function RoomUpdate() {

    const navigate = useNavigate();
    const { state } = useLocation();
    const { id } = useParams();
    const [roomData, setRoomData] = useState({
        roomCode: state?.roomCode,
		description: state?.description,
		roomType: state?.roomType?.id,
		category: state?.roomCategory?.name,
    });

	const [roomType, setRoomType] = useState([]);
	const [dataError, setDataError] = useState({});
	const [isTouched, setIsTouched] = useState(false);

    useEffect(() => {

        const loadData = async () => {
            getRoomDetail({ id: id, callback: (res) => {
                if(res.status === 200) {
                    setRoomData({
                        roomCode: res.data.roomCode,
                        description: res.data.description,
                        roomType: res.data.roomType?.id,
                        category: res.data.roomCategory?.name,
                    });
                }
            }});
        }

        return () => {
            loadData();
        }

    }, [id]);


    useEffect(() => {

		const loadRoomTypes = async () => {
			const res = await getRoomTypes();
			if(res.status === 200) {
				setRoomType(res.data);
			}
		};

		loadRoomTypes();

	}, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoomData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };


    const handleRoomSelect = (e) => {
        const roomTypeId = parseInt(e.target.value);
        setRoomData((prevState) => ({
            ...prevState,
            roomType: roomTypeId
        }));
    };

    const handleCreateRoom = async () => {
        if (!roomData.roomCode || (roomData.roomType !== 0 && roomData.roomType !== 1) || !roomData.description || !roomData.category) {
			toast.error("Please Fill In All Input !");
		}
        else {
            Swal.fire({
                title: 'Are You Sure ?',
                showCancelButton: true,
                confirmButtonColor: '#007bff',
                cancelButtonColor: '#aaa',
                confirmButtonText: 'OK',
                focusCancel: true,
                allowOutsideClick: false
            }).then(async (result) => {
                if (result.isConfirmed) {
                    // Xử lý khi người dùng bấm OK
                    Swal.fire({
                        title: "Loading...",
                        html: "Please wait a moment"
                    })
                    Swal.showLoading()
                    const res = await updateRoom({
                        id: id,
                        newData: roomData,
                    });

                    if (res.status === 200) {
                        toast.success("Update Room Success");
                        navigate(`/admin/room`);
                    }
                    else if(res.status < 500) {
                        toast.error(res.data);
                    }
                    else {
                        toast.error("Something wrong");
                    }

                    Swal.close();
                } else {
                    // Xử lý khi người dùng bấm Cancel
                    toast.info("Update cancelled");
                }
            });

        }
    }

    const validate = (e) => {
        const { name, value } = e.target;
        setIsTouched((prevState) => ({
            ...prevState,
            [name]: "Touch"
        }));
        if (value === '') {
            setDataError((prevState) => ({
                ...prevState,
                [name]: "Input Empty !"
            }));

        }
        else {
            setDataError((prevState) => ({
                ...prevState,
                [name]: ''
            }));

        }
    }

    // Room Category setup
	const [allCategories, setAllCategories] = useState([]);
	const [filteredCategories, setFilteredCategories] = useState([]);
	const [selectedText, setSelectedText] = useState(roomData.category);

	useEffect(() => {
		getRoomCategories(res => {
			if (res.status === 200) {
				setAllCategories(res.data);
			}
		});
	}, []);

	const search = (e) => {

		setTimeout(() => {
			let value = e.query;
			if(value) {
				let item = { id: 0, name: value }
				let filtered = allCategories.filter(x => x.name.toLowerCase().includes(value.trim().toLowerCase()));
				if (filtered.length) {
					setFilteredCategories([item, ...filtered]);
				}
				else {
					setFilteredCategories([item, ...allCategories]);
				}
			}
			else {
				setFilteredCategories([...allCategories]);
			}
		}, 250);

	}

	const categoryTemplate = (item) => {

		return (
			<div className="d-flex align-items-center justify-content-between gap-1">
				<span>{item.name}</span>
				{
					item.id === 0 ? (
						<span className="badge bg-primary">new</span>
					) : (
						<button className="btn btn-danger btn-sm" onClick={() => handleRemoveCategory(item.id)}>
							<i className="fa fa-times"></i>
						</button>
					)
				}
			</div>
		)
	}

	const handleChangeCategory = (e) => {
		setSelectedText(e.value);
	}

	const handleSelectCategory = (e) => {
		setRoomData({
			...roomData,
			category: e.value.name
		});
	}

	const handleRemoveCategory = (id) => {

		Swal.fire({
			icon: "warning",
			title: "Confirm Delete Room Category?",
			showConfirmButton: true,
			showCancelButton: true
		})
		.then(async ans => {
			if(ans.isConfirmed) {

				let res = await deleteRoomCategory(id);
				if(res.status === 200) {
					toast.success(res.data);
					setAllCategories(prev => prev.filter(item => item.id !== id));
				}
				else {
					Swal.fire({
						icon: "warning",
						title: "Cannot delete directly!",
						text: "Some data used this object. You need to update them before.",
						showConfirmButton: true
					});
				}
			}
		})

	}

    return (<>
        <div className="room-update p-5">
            <h1>Room Update</h1>
            <hr />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-6 col-sm-12 mb-3">
                        <label htmlFor="roomCode" className="form-label">Room Code: </label>

                        <input type="text" className={`form-control  ${isTouched.roomCode && (dataError.roomCode ? "is-invalid" : "is-valid")}`}
                            id="roomCode" name="roomCode" placeholder={roomData.roomCode} value={roomData.roomCode}
                            onBlur={validate} onChange={handleChange} />
                        {dataError.roomCode
                            ? <div class="invalid-feedback">
                                {dataError.roomCode}
                            </div>
                            : null}



                        <label htmlFor="roomType" className="form-label mt-2">Room State: </label>
                        <select className={`form-control  ${isTouched.roomType && (dataError.roomType ? "is-invalid" : "is-valid")}`}
                            id="roomType" name="roomType" defaultValue={roomData.roomType}
                            onBlur={validate} onChange={handleRoomSelect}>
                            {roomType && roomType.map(room => (
                                <option key={room.id} value={room.id}>{room.name}</option>
                            ))}
                        </select>
                        {dataError.roomType ? <div class="invalid-feedback">{dataError.roomType}</div> : null}

                        <>
							<label htmlFor="roomCategory" className="form-label mt-2">Room Category: </label>
							<div className="room-category">
								<AutoComplete field="name"
									value={selectedText}
									suggestions={filteredCategories}
									completeMethod={search}
									placeholder="Select a category"
									dropdown
									onChange={handleChangeCategory}
									onSelect={handleSelectCategory}
									itemTemplate={categoryTemplate}
								/>
							</div>
							{dataError.category
							? <div className="invalid-feedback">
								{dataError.category}
							</div>
							: null}
						</>

                    </div>
                    <div className="col-lg-6 col-sm-12 mb-3">
                        <label htmlFor="description" className="form-label">Description: </label>
                        <textarea className={`form-control  ${isTouched.description && (dataError.description ? "is-invalid" : "is-valid")}`}
                            id="description" name="description" placeholder={roomData.description} value={roomData.description}
                            onBlur={validate} onChange={handleChange}></textarea>
                        {dataError.description
                            ? <div class="invalid-feedback">
                                {dataError.description}
                            </div>
                            : null}

                    </div>
                </div>
            </div>

            <button className="btn btn-primary" onClick={handleCreateRoom}>Update</button>
        </div>
    </>);
}

export default RoomUpdate;