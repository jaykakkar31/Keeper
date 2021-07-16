import React, { useState ,useEffect} from "react";
import Fab from "@material-ui/core/Fab";

import AddIcon from "@material-ui/icons/Add";
import Zoom from "@material-ui/core/Zoom";

function CreateArea(props) {
	const [isExpanded, setIsExpanded] = useState(false);
	const [isAdded, setIsAdded] = useState(true);
	const [notesData, setNotesData] = useState({
		title: "",
		content: "",
	});

    useEffect(()=>{
        if(isAdded){
            props.fetchAllNotes();
            setIsAdded(false)
        }
    },[])

	function handleChange(event) {
		const { name, value } = event.target;
		setNotesData((prevValue) => {
			return {
				...prevValue,
				[name]: value,
			};
			console.log(notesdata);
		});
	}

	function expand() {
		setIsExpanded(true);
	}

	function submit(event) {
		event.preventDefault();

		if (notesData.title === "") {
			alert("Title Cannot Be Empty");
		} else if (notesData.content === "") {
			alert("Content Cannot Be Empty");
		} else {
			props.addingItems(notesData);
			setNotesData({
				title: "",
				content: "",
			});
            
		}
	}

	return (
		<div>
			<form className="create-note" required>
				{isExpanded && (
					<input
						onChange={handleChange}
						//   onChange={handleTitleChange}
						type="text"
						name="title"
						placeholder="Title"
						value={notesData.title}
					/>
				)}
				<textarea
					onClick={expand}
					onChange={handleChange}
					//   onChange={handleContentChange}
					name="content"
					placeholder="Take a note..."
					rows={isExpanded ? "3" : "1"}
					value={notesData.content}
				/>
				<Zoom in={isExpanded}>
					<Fab type="submit" onClick={submit}>
						<AddIcon />
					</Fab>
				</Zoom>
			</form>
		</div>
	);
}

export default CreateArea;
