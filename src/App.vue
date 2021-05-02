<template>
<v-app>
  <v-card>
    
    <v-card-text>
      
      <v-autocomplete
      id="autocompletet"
        :label="` Ville`"
        persistent-hint
          prepend-inner-icon="mdi-city"
      >
        <template v-slot:append-outer>
          <v-slide-x-reverse-transition
            mode="out-in"
          >
            <v-icon
            @click='position()'
              :color=" 'info'"
              v-text="'mdi-circle-edit-outline'"
            ></v-icon>
          </v-slide-x-reverse-transition>
        </template>
      </v-autocomplete>
    </v-card-text>
  </v-card>
  <div id="showmaps" ></div>
  </v-app>
</template>
<script>
import axios from "axios"

export default{
    data(){
return{
    address:"",
}
    },
    mounted (){
                var options = {
                types: ['(cities)'],
                componentRestrictions: {country: "Be"}
            }; 
 const google = window.google;

      var autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("autocompletet"),options,
      {
        bounds: new google.maps.LatLngBounds(
          new google.maps.LatLng(45.4215296, -75.6971931)
        ),
      }
    );

    autocomplete.addListener("place", () => {
      var place = autocomplete.getPlace();

      this.showinmap(
        place.geometry.location.lat(),
        place.geometry.location.lng()
      );
    });
    },
     methods : {
          position(){
              if(navigator.geolocation){
                  navigator.geolocation.getCurrentPosition(position=> {
                      this.adressp(position.coords.latitude,position.coords.longitude);
                      console.log(position.coords.latitude);
                      console.log(position.coords.longitude);
                      this.showinmap(position.coords.latitude,position.coords.longitude);
                  },
                  error=>{
                      console.log(error.message);
                  }
                  
                  );
              } else {
                  console.log("error in your browser");
              }
          },
          adressp(lat,lon){
            
      axios.get( "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +lat +"," +lon +"&key=AIzaSyD6fOErcQgbTSJdovzDSCCKt-GpoEpMo3Y" )
        .then((response) => {
          if (response.data.error_message) {
            console.log(response.data.error_message);
          } else {
            this.address = response.data.results[0].formatted_address;
            console.log(response.data.results[0].formatted_address);
          }
        })
        .catch((error) => {
         
          console.log(error.message);
        });
          },
          showinmap(lat,lon){
              const google = window.google;
              let map= new google.maps.Map(document.getElementById("showmaps"),
             { zoom: 15,
              center: new google.maps.LatLng(lat,lon),
              mapTypeId: google.maps.MapTypeId.RODMAP
              });
               new google.maps.Marker({
        position: new google.maps.LatLng(lat, lon),
        map: map,
      });

          },
      }
}
</script>
<style >
#showmaps{
  margin-top: 50px;
  width: 100%;
  height: 100px;
  background-color: aqua;
}

</style>