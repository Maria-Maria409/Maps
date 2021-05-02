<template>

<v-app>
  <v-main>
    <v-container fluid>

<v-row>
  <v-col>test1</v-col>
  <v-autocomplete
          v-model="location.city"
          :disabled="!location.country"
          :items="getCities()"
          :rules="townRules"
          prepend-inner-icon="mdi-city"
          :label="$t('register.form.town')"
          color="secondary"
          item-text="city"
          item-value="city"
          required
          autocomplete="chrome-off"
          @input="updateLocation"
          @keydown.enter="submit()"
        >
          <template v-slot:append>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-on="on" v-bind="attrs" icon>
                  <v-icon>mdi-information</v-icon>
                </v-btn>
              </template>
              <span>{{ $t("leadsender.countryRecommendation") }}</span>
            </v-tooltip>
          </template></v-autocomplete
        >
</v-row>
    </v-container>
  </v-main>


</v-app>

</template>