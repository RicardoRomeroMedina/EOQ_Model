# Importing libraries.
  library(shiny)
  library(SCperf)

  # Shiny server that receives input, output and session values.
    shinyServer(function(input,output,session){

      # Listening to the click event where "$click" is the id of the button.
      observeEvent(input$click,{

        # Values that arrive from Javascript. You can see them through the server console.
          print(input$click)

        # Values from the mm1k model:  demand, ordercost, holdingcost and shortage 😷.
          demand <- input$click$demand
          ordering <- input$click$ordering
          holding <- input$click$holding
          shortage <- input$click$shortage
          business <- input$click$business
          #lewed

        # I send the values to build the model.
         eoq <- EOQ(d = demand, k = ordering, h = holding, b = shortage)
        # I check that the conditions are met in order to use this model ✔.
          #CheckInput(i_mm1k)
          
        # building the model ⚒.
          #o_mm1k <- QueueingModel(i_mm1k)
        # Extracting the values.
          # [Values that will be sent to Javascript]
            # The probability (p0, p1, ..., pk) of the clients in the system.
             #Maximum backorders in units
              q <- eoq[[1]]
            #Time between orders              
              t <- eoq[[2]]
            # Total variable cost 
              tvc <- eoq[[3]]
            # Annual ordering cost
              order <- ((demand/q)*ordering)
            # Annual holding cost
              hold <- ((q*holding)/2)
            # Number of orders
              num <- (demand/q)
            # Daily demand 
              daily <- (demand/business)
            #Lead time
              l = (business/num)
            # Reorder when inventory on hand 
              reo <- ((demand/business)*l)
            # Total cost
              tot <- ((demand*ordering)+order+hold)
              #pn <- Pn(o_mm1k)
            # The traffic intensity.
              #traffic_intensity <- (L(o_mm1k) - Lq(o_mm1k))
            # The server use.
              #server_use <- RO(o_mm1k)
            # The mean number of clients in the system.
              #mnc_system <- L(o_mm1k)
            # The mean number of clients in the queue.
              #mnc_queue <- Lq(o_mm1k)
            # The mean number of clients in the server.
              #mnc_server <- (L(o_mm1k) - Lq(o_mm1k))
            # The mean time spend in the system.
              #mts_system <- W(o_mm1k)
            # The mean time spend in the queue.
              #mts_queue <- Wq(o_mm1k)
            # The mean time spend in the server.
              #mts_server <- W(o_mm1k) - Wq(o_mm1k)
            # The mean time spend in the queue when there is queue.
              #mtsq_queue <- Wqq(o_mm1k)
            # The throughput.
              #throughput <- Throughput(o_mm1k)

          # I create a list that will save all the previous values to send them to Javascript and it receives them as a vector.
          # Unfortunately I didn't know how to send it as an associative vector.
            #info <- list(pn, traffic_intensity,server_use, mnc_system, mnc_queue, mnc_server, mts_system, mts_queue, mts_server, mtsq_queue, throughput)
              info <- list(q,t,tvc,reo,order,hold,num,daily,l,tot)
          # I send the values to Javascript.
          session$sendCustomMessage("handler_stable_state_chart", info)
      })
    })
