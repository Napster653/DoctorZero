let progressBar = document.getElementById('dna_sequencer_progress');
let dnaDisplay = document.getElementById('dna_sequence');
let sequenceIdInput = document.getElementById('sequence_id');
let isVirusResult = document.getElementById('isVirusResult');

// A simple seeded pseudo-random number generator (PRNG)
function seededRandom(seed)
{
    let x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

// Generate a DNA sequence from a seed
function generateDNASequence(key)
{
    // Initialize DNA sequence
    let dnaSequence = '';

    // Map numbers to DNA base pairs
    let basePairs = ['A', 'T', 'G', 'C'];

    // Convert the key into a seed by summing char codes
    let seed = 0;
    for (let i = 0; i < key.length; i++)
    {
        seed += key.charCodeAt(i);
    }

    // Generate DNA sequence
    for (let i = 0; i < 10000; i++)
    { // Change this number to adjust the length of the sequence
        let randIndex = Math.floor(seededRandom(seed + i) * basePairs.length);
        dnaSequence += basePairs[randIndex];
    }

    // Check for virus sequence
    if (key === 'e32d6f5406')
    { // Change this to the key that triggers the virus warning
        return [dnaSequence, true];
    }
    return [dnaSequence, false];
}

sequenceIdInput.addEventListener('keydown', function (e)
{
    // Check if Enter was pressed
    if (e.key === 'Enter')
    {
        e.preventDefault(); // Prevent form submission

        let sequence_id = e.target.value;
        let ret = generateDNASequence(sequence_id);
        dnaSequence = ret[0];
        isVirus = ret[1];
        dnaDisplay.value = dnaSequence;

        // Disable the input field
        sequenceIdInput.disabled = true;

        // Get computed styles for the progress bar
        let style = window.getComputedStyle(progressBar);

        // Save the old transition property
        let oldTransition = style.transition;

        // Disable transitions
        progressBar.style.transition = 'none';

        // Set the width to 0%
        progressBar.style.width = '0%';
        progressBar.setAttribute("aria-valuenow", 0);

        // Force a redraw (this is usually necessary to ensure the changes take effect before re-enabling transitions)
        void progressBar.offsetWidth;

        // Re-enable transitions
        progressBar.style.transition = oldTransition;

        // Scroll text and wait for it to complete
        scrollSequence().then(() =>
        {
            // This code will execute after the scrollSequence() function is resolved
            // Re-enable the input field after scrolling is done
            sequenceIdInput.disabled = false;

            if (isVirus)
            {
                isVirusResult.className = '';
                isVirusResult.classList.add('text-center', 'text-danger');
                isVirusResult.textContent = 'VIRUS DETECTED!';
            }
            else
            {
                isVirusResult.className = '';
                isVirusResult.classList.add('text-center', 'text-success');
                isVirusResult.textContent = 'SAFE DNA SEQUENCE';
            }
        });
    }
});

function scrollSequence()
{
    return new Promise((resolve, reject) =>
    {
        let start = null;
        let speed = 1; // Decrease to scroll faster

        function step(timestamp)
        {
            if (!start) start = timestamp;
            let progress = timestamp - start;
            let position = Math.min(progress / speed, dnaSequence.length);
            dnaDisplay.scrollLeft = position;
            let percent = (position / dnaSequence.length) * 100;
            progressBar.style.width = `${percent}%`;
            progressBar.setAttribute("aria-valuenow", percent);
            if (position < dnaSequence.length)
            {
                requestAnimationFrame(step);
            } else
            {
                console.log('Scrolling finished');
                resolve();
            }
        }

        requestAnimationFrame(step);
    });
}
