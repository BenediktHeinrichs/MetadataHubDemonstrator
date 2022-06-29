<template>
  <div>
    <hr />
    <b-form-group
      label="Select the targeted provider"
      label-for="mappingSelect"
    >
      <b-form-select id="mappingSelect" v-model="selection" :options="mappings">
        <!-- This slot appears above the options from 'options' prop -->
        <template #first>
          <b-form-select-option :value="null" disabled
            >-- Please select an option --</b-form-select-option
          >
        </template>
      </b-form-select>
    </b-form-group>
    <hr />
    <div v-if="selection">
      <b-form-group label="Input your User Token" label-for="token">
        <b-form-input
          id="token"
          v-model="token"
          placeholder="Please input a Token"
        />
      </b-form-group>
      <b-form-group label="Select the wanted method" label-for="methodSelect">
        <b-form-select id="methodSelect" v-model="method" :options="methods">
          <!-- This slot appears above the options from 'options' prop -->
          <template #first>
            <b-form-select-option :value="null" disabled
              >-- Please select an option --</b-form-select-option
            >
          </template>
        </b-form-select>
      </b-form-group>
    </div>
    <div v-if="method">
      <b-form-group label="Select the wanted type" label-for="typeSelect">
        <b-form-select id="typeSelect" v-model="type" :options="types">
          <!-- This slot appears above the options from 'options' prop -->
          <template #first>
            <b-form-select-option :value="null" disabled
              >-- Please select an option --</b-form-select-option
            >
          </template>
        </b-form-select>
      </b-form-group>
    </div>
    <div v-if="type">
      <b-form-group
        v-if="pathFieldVisible"
        label="Input the metadata path"
        label-for="path"
      >
        <b-form-input
          id="path"
          v-model="path"
          placeholder="Please input a Metadata path"
        />
      </b-form-group>
      <b-form-group
        v-if="fileFieldVisible"
        label="Input metadata file"
        label-for="file"
      >
        <b-form-file
          id="file"
          v-model="file"
          placeholder="Please input a Metadata path"
        />
      </b-form-group>
      <b-button
        :disabled="
          !((path || !pathFieldVisible) && (file || !fileFieldVisible))
        "
        @click="send"
        >Send Request</b-button
      >
    </div>
    <div v-if="result">
      <hr />
      <b-form-group label="Response" label-for="result">
        <b-form-textarea id="result" v-model="result" :readonly="true" />
      </b-form-group>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue-demi";

import { receiveMappings } from "@/requests/rest-client";

export default defineComponent({
  data() {
    return {
      file: null as null | File,
      mappings: [] as string[],
      method: null as string | null,
      methods: ["Create", "Read", "Update", "Delete", "List"],
      path: null as string | null,
      result: null as string | null,
      selection: null as string | null,
      token: null as string | null,
      type: null as string | null,
      types: ["Metadata", "Schema"],
    };
  },
  computed: {
    fileFieldVisible(): boolean {
      return this.method === "Create" || this.method === "Update";
    },
    pathFieldVisible(): boolean {
      return this.method !== "List";
    },
  },
  created() {
    this.initialize();
  },
  methods: {
    async initialize() {
      this.mappings = await receiveMappings();
    },
    async send() {
      // TODO: Send the request
      this.result = "Response";
    },
  },
});
</script>
