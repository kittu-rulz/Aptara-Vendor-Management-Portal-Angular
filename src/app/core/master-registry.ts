import { WritableSignal } from '@angular/core';
import {
  MasterRow,
  natureOfServicesData,
  serviceExecutedData,
  orgTypeData,
  gstData,
  outsourceStatusData,
  entityData,
  marketSegmentData,
  currencyData
} from './mock-data';

export interface MasterFieldConfig {
  key: string;
  label: string;
  type?: 'text' | 'number' | 'select';
  options?: string[];
  placeholder?: string;
}

export interface MasterTypeConfig {
  slug: string;
  rows: WritableSignal<MasterRow[]>;
  /** Column config for the list table. */
  columns: { key: string; label: string }[];
  /** Field config for the Add/Edit/View page — usually the same shape as
   * columns, but kept separate since a couple of masters (Currency) show
   * dropdown fields on the form that are plain text columns in the list. */
  fields: MasterFieldConfig[];
  addLabel: string;
  countLabel: string;
  /** e.g. "Nature of Service Master" — used for "Edit X" / "View X" / "X History" titles. */
  singularLabel: string;
  pageTitle: string;
  breadcrumbLabel: string;
}

/** Central lookup driving the routed Add/Edit/View/History pages shared by
 * every Masters & Config list — mirrors the real app's per-master pages
 * (e.g. "Edit Nature of Service Master") exactly, keyed by the same slug
 * already used in the list routes. */
export const MASTER_TYPES: Record<string, MasterTypeConfig> = {
  'nature-of-service': {
    slug: 'nature-of-service',
    rows: natureOfServicesData,
    columns: [{ key: 'name', label: 'Nature of Service Provided' }],
    fields: [{ key: 'name', label: 'Nature of Service', type: 'text' }],
    addLabel: 'Nature Of Service',
    countLabel: 'All',
    singularLabel: 'Nature of Service Master',
    pageTitle: 'Nature of Service Master List',
    breadcrumbLabel: 'Nature Of Service'
  },
  'service-executed': {
    slug: 'service-executed',
    rows: serviceExecutedData,
    columns: [
      { key: 'service', label: 'Service Name' },
      { key: 'requestType', label: 'Request Type' }
    ],
    fields: [
      { key: 'service', label: 'Service Name', type: 'text' },
      { key: 'requestType', label: 'Request Type', type: 'select', options: ['Development', 'Design', 'QA'], placeholder: '-Select Request Type-' }
    ],
    addLabel: 'Service Executed',
    countLabel: 'All',
    singularLabel: 'Service Executed Master',
    pageTitle: 'Service Executed Master List',
    breadcrumbLabel: 'Service Executed'
  },
  'organization-type': {
    slug: 'organization-type',
    rows: orgTypeData,
    columns: [{ key: 'type', label: 'Type of Organization' }],
    fields: [{ key: 'type', label: 'Type of Organization', type: 'text' }],
    addLabel: 'Type of Organization',
    countLabel: 'All',
    singularLabel: 'Type of Organization Master',
    pageTitle: 'Type of Organization Master List',
    breadcrumbLabel: 'Organization Type'
  },
  'gst-eligibility': {
    slug: 'gst-eligibility',
    rows: gstData,
    columns: [{ key: 'type', label: 'GST Eligibility' }],
    fields: [{ key: 'type', label: 'GST Eligibility', type: 'text' }],
    addLabel: 'GST Eligibility',
    countLabel: 'All',
    singularLabel: 'GST Eligibility Master',
    pageTitle: 'GST Eligibility Master List',
    breadcrumbLabel: 'GST Eligibility'
  },
  'outsource-status': {
    slug: 'outsource-status',
    rows: outsourceStatusData,
    columns: [{ key: 'status', label: 'Project Outsource Status' }],
    fields: [{ key: 'status', label: 'Project Outsource Status', type: 'text' }],
    addLabel: 'Outsource Status',
    countLabel: 'All',
    singularLabel: 'Project Outsource Status Master',
    pageTitle: 'Outsources Status Master List',
    breadcrumbLabel: 'Outsource Status'
  },
  entity: {
    slug: 'entity',
    rows: entityData,
    columns: [
      { key: 'name', label: 'Company Name' },
      { key: 'code', label: 'Company Code' },
      { key: 'sbu', label: 'SBU' },
      { key: 'loc', label: 'Location' }
    ],
    fields: [
      { key: 'name', label: 'Entity', type: 'text' },
      { key: 'code', label: 'Company Code', type: 'text' },
      { key: 'sbu', label: 'SBU', type: 'text' },
      { key: 'loc', label: 'Location', type: 'text' }
    ],
    addLabel: 'Entity',
    countLabel: 'All Entities',
    singularLabel: 'Entity',
    pageTitle: 'Entity Master List',
    breadcrumbLabel: 'Entity Master'
  },
  'market-segment': {
    slug: 'market-segment',
    rows: marketSegmentData,
    columns: [
      { key: 'segment', label: 'Market Segment' },
      { key: 'code', label: 'Segment Code' }
    ],
    fields: [
      { key: 'segment', label: 'Market Segment', type: 'text' },
      { key: 'code', label: 'Market Segment Code', type: 'text' }
    ],
    addLabel: 'Market Segment',
    countLabel: 'All Segments',
    singularLabel: 'Market Segment',
    pageTitle: 'Market Segment Master List',
    breadcrumbLabel: 'Market Segment'
  },
  currency: {
    slug: 'currency',
    rows: currencyData,
    columns: [
      { key: 'curr', label: 'Currency' },
      { key: 'amount', label: 'Currency Amount' },
      { key: 'year', label: 'Year' },
      { key: 'month', label: 'Month' },
      { key: 'desc', label: 'Description' }
    ],
    fields: [
      { key: 'curr', label: 'Currency', type: 'select', options: ['USD', 'INR', 'EUR', 'GBP'] },
      { key: 'amount', label: 'Amount', type: 'number', placeholder: 'Enter Currency Amount' },
      { key: 'year', label: 'Year', type: 'select', options: ['2024', '2025', '2026', '2027'], placeholder: 'Select Year' },
      { key: 'month', label: 'Month', type: 'select', options: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], placeholder: 'Select Month' },
      { key: 'desc', label: 'Description', type: 'text' }
    ],
    addLabel: 'Currency',
    countLabel: 'All Currencies',
    singularLabel: 'Currency',
    pageTitle: 'Currency Master List',
    breadcrumbLabel: 'Currency Master'
  }
};
