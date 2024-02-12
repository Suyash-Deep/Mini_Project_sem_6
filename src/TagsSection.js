import React from "react";

function TagsSection() {
	// Dummy tags data
	const tags = ["Tag1", "Tag2", "Tag3", "Tag4", "Tag5"];

	return (
		<div className="tags-section">
			<h2>Tags</h2>
			<div className="tags">
				{tags.map((tag, index) => (
					<span key={index} className="tag">
						{tag}
					</span>
				))}
			</div>
		</div>
	);
}

export default TagsSection;
