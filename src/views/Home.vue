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
        v-if="method === 'Update'"
        label="Input the etag"
        label-for="etag"
      >
        <b-form-input
          id="etag"
          v-model="etag"
          placeholder="Please input a etag"
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

import {
  createMetadata,
  createSchema,
  getMetadata,
  getSchema,
  receiveMappings,
  updateMetadata,
  updateSchema,
} from "@/requests/rest-client";

export default defineComponent({
  name: "HomeView",
  data() {
    return {
      etag: undefined as string | undefined,
      file: null as null | File,
      mappings: [] as string[],
      method: null as "Create" | "Read" | "Update" | "Delete" | "List" | null,
      methods: ["Create", "Read", "Update", "Delete", "List"],
      path: null as string | null,
      result: null as string | null,
      selection: null as string | null,
      token: null as string | null,
      type: null as "Metadata" | "Schema" | null,
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
      if (
        this.selection &&
        this.type &&
        this.token &&
        (this.method === "List" || this.path)
      ) {
        const clientId = `${this.selection.toLowerCase()}_${this.type}_ID`;
        switch (this.method) {
          case "Create":
            if (this.file) {
              const content = await this.file.text();
              if (this.type === "Metadata") {
                this.result = await createMetadata({
                  clientId,
                  id: this.path!,
                  token: this.token,
                  mimetype: this.file.type,
                  metadata: content,
                });
              } else {
                this.result = await createSchema({
                  clientId,
                  id: this.path!,
                  token: this.token,
                  mimetype: this.file.type,
                  schema: content,
                });
              }
            }
            break;
          case "Read":
            if (this.type === "Metadata") {
              this.result = await getMetadata({
                clientId,
                id: this.path!,
                token: this.token,
              });
            } else {
              this.result = await getSchema({
                clientId,
                id: this.path!,
                token: this.token,
              });
            }
            break;
          case "Update":
            if (this.file) {
              const content = await this.file.text();
              if (this.type === "Metadata") {
                this.result = await updateMetadata({
                  clientId,
                  id: this.path!,
                  token: this.token,
                  mimetype: this.file.type,
                  metadata: content,
                  etag: this.etag,
                });
              } else {
                this.result = await updateSchema({
                  clientId,
                  id: this.path!,
                  token: this.token,
                  mimetype: this.file.type,
                  schema: content,
                  etag: this.etag,
                });
              }
            }
            break;
          case "Delete":
            this.result = "Not Implemented";
            break;
          case "List":
            this.result = "Not Implemented";
            break;
          default:
            this.result = "No Case";
            break;
        }
      } else {
        this.result = "Application Error";
      }
    },
  },
});
</script>
