function startAudio() {
    if (annyang) {
      const commands = {
        // voice commands for all pages
        'hello': () => alert('Hello World!'),
  
        'change the color to *color': (color) => {
          document.body.style.backgroundColor = color;
        },
  
        'navigate to *page': (page) => {
          page = page.toLowerCase();
          if (page.includes('home')) window.location.href = 'index.html';
          else if (page.includes('stocks')) window.location.href = 'stocks.html';
          else if (page.includes('dogs')) window.location.href = 'dogs.html';
        },
  
        // stocks page command
        'lookup *ticker': (ticker) => {
          ticker = ticker.toUpperCase();
          window.location.href = `stocks.html#${ticker}`;
        },
  
        // dogs page command
        'load dog breed *breed': (breed) => {
          const formatted = breed.toLowerCase();
          window.location.href = `dogs.html#breed=${encodeURIComponent(formatted)}`;
        }
      };
  
      annyang.addCommands(commands);
      annyang.start();
      console.log("Voice recognition started");
    }
  }
  
  function stopAudio() {
    if (annyang) {
      annyang.abort();
      console.log("Voice recognition stopped");
    }
  }
  