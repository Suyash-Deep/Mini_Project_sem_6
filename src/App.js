import React, { useState } from "react";
import TagsSection from "./TagsSection"; // Import the TagsSection component
import "./App.css"; // Import the CSS file for styling

function App() {
	const [selectedFileContent, setSelectedFileContent] = useState(null); // State to store the text content of the selected file
	const [language, setLanguage] = useState("English"); // State to manage selected language
	const [currentLineIndex, setCurrentLineIndex] = useState(0); // State to keep track of the currently displayed line index
	const [startIndex, setStartIndex] = useState(0); // State to keep track of the start index of the words displayed in Box 2

	// Function to handle file selection
	const handleFileChange = (event) => {
		const file = event.target.files[0]; // Get the selected file
		const reader = new FileReader();

		reader.onload = (e) => {
			const fileContent = e.target.result; // Get the text content of the selected file
			const lines = fileContent.split("\n"); // Split the text content into lines
			setSelectedFileContent(lines); // Update state with the array of lines
			setCurrentLineIndex(0); // Reset the line index
			setStartIndex(0); // Reset the start index
		};

		reader.readAsText(file); // Read the content of the selected file as text
	};

	// Function to handle language selection
	const handleChangeLanguage = (event) => {
		const selectedLanguage = event.target.value;
		setLanguage(selectedLanguage); // Update selected language

		// Set background color based on selected language
		if (selectedLanguage === "English") {
			document.body.style.backgroundColor = "#f1f5f0"; // Set background color for English
		} else if (selectedLanguage === "Hindi") {
			document.body.style.backgroundColor = "#ffe6e6"; // Set background color for Hindi
		}
	};

	const handleNext = () => {
		if (
			selectedFileContent &&
			startIndex + 20 < selectedFileContent[currentLineIndex].split(" ").length
		) {
			setStartIndex(startIndex + 20); // Increment the start index by 20
		} else {
			let nextLineIndex = currentLineIndex + 1;
			while (
				nextLineIndex < selectedFileContent.length &&
				selectedFileContent[nextLineIndex].trim() === ""
			) {
				nextLineIndex++; // Skip blank lines
			}
			if (nextLineIndex < selectedFileContent.length) {
				setCurrentLineIndex(nextLineIndex); // Update the line index to the next non-blank line
				setStartIndex(0); // Reset start index when moving to the next line
			}
		}
	};

	const handlePrevious = () => {
		if (startIndex > 0) {
			// If there are previous words on the current line, just move to the previous words
			setStartIndex(startIndex - 20); // Decrement the start index by 20
		} else {
			let prevLineIndex = currentLineIndex - 1;
			// Find the previous line index, even if it's a blank line
			while (
				prevLineIndex >= 0 &&
				selectedFileContent[prevLineIndex].trim() === ""
			) {
				prevLineIndex--;
			}
			// Update the line index to the previous line, even if it's a blank line
			if (prevLineIndex >= 0) {
				setCurrentLineIndex(prevLineIndex);
				const wordsInPrevLine = selectedFileContent[prevLineIndex].split(" ");
				const wordsCount = wordsInPrevLine.length;
				// Calculate the start index for displaying 20 words
				const startIndex = Math.max(wordsCount - 20, 0);
				setStartIndex(startIndex);
			}
		}
	};



	// Function to handle save action
	const handleSave = () => {
		// Add logic for save action here
	};

	// Function to handle download action
	const handleDownload = () => {
		const element = document.createElement("a");
		const file = new Blob([selectedFileContent.join("\n")], {
			type: "text/plain",
		}); // Join lines back into a single string
		element.href = URL.createObjectURL(file);
		element.download = "file.txt";
		document.body.appendChild(element);
		element.click();
	};

	return (
		<div>
			<nav>
				<ul>
					<li>
						<a href="#home">Home</a>
					</li>
					<li>
						<a href="#about">About</a>
					</li>
					<li>
						<a href="#contact">Contact</a>
					</li>
				</ul>
			</nav>
			{/* Language selector */}
			<div className="language-select">
				<label htmlFor="language">Language:</label>
				<select id="language" value={language} onChange={handleChangeLanguage}>
					<option value="Hindi">Hindi</option>
					<option value="English">English</option>
				</select>
			</div>
			{/* File upload button */}
			<div className="file-upload">
				<label htmlFor="file">Select File:</label>
				<input type="file" id="file" onChange={handleFileChange} />
			</div>
			{/* Display selected file content */}
			<div className="container">
				<div className="big-box">
					<h2>Box 1</h2>
					<div className="box-content">
						{selectedFileContent &&
							selectedFileContent.map((line, index) => (
								<p key={index}>{line}</p>
							))}
					</div>
				</div>
				<div className="big-box">
					<h2>Box 2</h2>
					<div className="box-content">
						{selectedFileContent && selectedFileContent[currentLineIndex] && (
							<p>
								{selectedFileContent[currentLineIndex]
									.split(" ")
									.slice(startIndex, startIndex + 20)
									.join(" ")}
							</p>
						)}
					</div>
				</div>
			</div>
			{/* Buttons */}
			<div className="button-container">
				<button onClick={handlePrevious}>Previous</button>
				<button onClick={handleNext}>Next</button>
				<button onClick={handleSave}>Clear</button>
				<button onClick={handleSave}>Save</button>
				<button onClick={handleDownload}>Download</button>
			</div>
			{/* Tags section */}
			<TagsSection />
		</div>
	);
}

export default App;
