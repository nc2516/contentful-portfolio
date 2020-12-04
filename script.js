
const app = {
    initialize: function() {
      app.client = contentful.createClient({
        space: "uwnqj0e957wq",
        accessToken: "Z3cA9h-XXOlFkUsv2hptlIZZkYP1WzMAcr4UgD_ovcs"
      });
    },



    getEntry: function(entry) {
        // fetch project
        app.client.getEntry(entry).then(project => {
          debugger;
          const projectData = {
            title: project.fields.title,
            imageUrl: `http:${project.fields.image.fields.file.url}`,
            imageTitle: project.fields.image.fields.title,
            description: documentToHtmlString(project.fields.description)
          };
          // load template for this item from a local file
          fetch('projectPage.mustache')
            .then(response => response.text())
            .then(template => {
              // render the template data
              const rendered = Mustache.render(template, projectData);
              // add the element to the container
              $('.container').append(rendered);
            }
          );
        });
      },
    
      getAllEntries: function() {
        // fetch all entries
        app.client.getEntries().then(response => {
          // go through each one
          response.items.forEach(project => {
            // pull out the data you're interested in
            const projectData = {
              title: project.fields.title,
              imageUrl: `http:${project.fields.image.fields.file.url}`,
              imageTitle: project.fields.image.fields.title,
              slug: `${project.fields.slug}.html`
            };
            // load the template for this item from a local file
            fetch('projectOnHome.mustache')
              .then(response => response.text())
              .then(template => {
                // render the template with the data
                const rendered = Mustache.render(template, projectData);
                // add the element to the container
                $('.container').append(rendered);
              }
            );
          });
        });
      }
    };
