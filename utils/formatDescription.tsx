export function formatDescription(description: string) {
  // Split the description into sections based on headings
  const sections = description.split(/\n(?=\w)/);

  // Process each section to format it
  const formattedSections = sections.map((section, index) => {
    // Split each section into lines
    const lines = section.trim().split('\n');

    // The first line is treated as the heading
    const heading = lines[0].trim();
    const content = lines.slice(1).join(' ');

    return (
      <div key={index}>
        <h2>{heading}</h2>
        <p>{content}</p>
      </div>
    );
  });

  return formattedSections;
}
