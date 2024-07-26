var webform = new Survey123WebForm({
    container: 'survey_html_element', // this is the element id of the previously create div element
    itemId: '204359b351b14a838f3bd368960a8d5b', // The attached document explains where to find this
    
    //Getting Form data
    onFormSubmitted: (data) => {
      console.log('Form submitted: ', data.surveyFeatureSet);
      data.surveyFeatureSet.features.forEach(
        feature => {
          const attributes = feature.attributes;
          let attributesQuestions = attributes.question;
          let attributesValues = attributes.value;
          console.log('attributesValues:', attributesValues);

        }
      );
      data.surveyFeatureSet.features.forEach(
        feature => {
          const geometry = feature.geometry;
          let geometryQuestions = geometry.question;
          let geometryValues = geometry.value;
        //   console.log('Geometry:', geometry);
        }
      );
      data.surveyFeatureSet.features.forEach(
        feature => {
          const attachments = feature.attachments;
          let attachmentsQuestions = attachments.question;
          let attachmentsValues = attachments.value;
        //   console.log('Attachments:', attachments);
        }
      );
    }
  })

  webform.on("formLoaded", async (e) => {
    const urlParams = new URLSearchParams(window.location.search);
    // Set sales channel form-field
    if (urlParams.get("sales_channel") !== null) {
        webform.setQuestionValue({
            "sales_channel": urlParams.get("sales_channel")
        })
    }

    // Set agent naam form-field
    if (urlParams.get("agent_naam") !== null) {
        webform.setQuestionValue({
            "agent_naam": urlParams.get("agent_naam")
        })
    }

    // Set agent id form-fied
    if (urlParams.get("agent_id_ip") !== null) {
        webform.setQuestionValue({
            "agent_id_ip": urlParams.get("agent_id_ip")
        })
    }

    const pages = webform.getQuestions();

    const questions = [];
    pages.forEach((page, index) => {
        const q = flattenQuestions(page);
        if (q.constructor === Array) {
            q.forEach((question, index) => {
                questions.push(question)
            })
        } else {
            questions.push(q);
        }
    })
    console.log('questions',questions);
})

function flattenQuestions(obj) {
    let flattened = [];

    function flatten(obj) {
        if (obj.questions) {
            obj.questions.forEach(question => {
                if (!question.id.includes('group')) {
                    if (question.relevant) {
                        flattened.push({
                            'id': question.id,
                            'name': question.name,
                            'fieldName': question.fieldName,
                            'type': question.type,
                            'value': question.value === undefined ? '' : question.value,
                            'relevant': question.relevant.expression
                        });
                    } else {
                        flattened.push({
                            'id': question.id,
                            'name': question.name,
                            'fieldName': question.fieldName,
                            'type': question.type,
                            'value': question.value === undefined ? '' : question.value,
                        });
                    }
                }
                flatten(question);
            });
        }
    }

    flatten(obj);

    return flattened;
}


//Sort data

function sortFormData(obj) {
    let formData = [];
    if (attributes.question === questions.fieldName) {
        formData.push({
            'id': questions.id,
            'fieldName': questions.fieldName,
            'value': attributes.value
        });
    }
    return formData;
}
