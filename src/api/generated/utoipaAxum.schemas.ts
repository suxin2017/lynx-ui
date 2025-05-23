/**
 * Generated by orval v7.9.0 🍺
 * Do not edit manually.
 * utoipa-axum
 * Utoipa's axum bindings for seamless integration for the two
 * OpenAPI spec version: 0.2.0
 */
export interface CaptureSwitch {
  recordingStatus: RecordingStatus
}

export type EmptyOkResponse = ResponseDataWrapperTupleUnit

export type GetRequestsDataTraceIds = string[] | null

export interface GetRequestsData {
  traceIds?: GetRequestsDataTraceIds
}

export type MessageEventBody = string

export type MessageEventRequestHeaders = { [key: string]: string }

export interface MessageEventRequest {
  body: MessageEventBody
  headerSize: MessageHeaderSize
  headers: MessageEventRequestHeaders
  method: string
  url: string
  version: string
}

export type MessageEventResponseHeaders = { [key: string]: string }

export interface MessageEventResponse {
  body: MessageEventBody
  headerSize: MessageHeaderSize
  headers: MessageEventResponseHeaders
  /** @minimum 0 */
  status: number
  version: string
}

export type MessageEventStatusOneOf = {
  Error: string
}

export type MessageEventStatus =
  | 'Initial'
  | 'RequestStarted'
  | 'Completed'
  | MessageEventStatusOneOf
  | 'Cancelled'

export type MessageEventStoreValueRequest = null | MessageEventRequest

export type MessageEventStoreValueResponse = null | MessageEventResponse

export interface MessageEventStoreValue {
  isNew: boolean
  request?: MessageEventStoreValueRequest
  response?: MessageEventStoreValueResponse
  status: MessageEventStatus
  timings: MessageEventTimings
  traceId: string
}

/**
 * @minimum 0
 */
export type MessageEventTimingsProxyEnd = number | null

/**
 * @minimum 0
 */
export type MessageEventTimingsProxyStart = number | null

/**
 * @minimum 0
 */
export type MessageEventTimingsReponseBodyEnd = number | null

/**
 * @minimum 0
 */
export type MessageEventTimingsReponseBodyStart = number | null

/**
 * @minimum 0
 */
export type MessageEventTimingsRequestBodyEnd = number | null

/**
 * @minimum 0
 */
export type MessageEventTimingsRequestBodyStart = number | null

/**
 * @minimum 0
 */
export type MessageEventTimingsRequestEnd = number | null

/**
 * @minimum 0
 */
export type MessageEventTimingsRequestStart = number | null

export interface MessageEventTimings {
  /** @minimum 0 */
  proxyEnd?: MessageEventTimingsProxyEnd
  /** @minimum 0 */
  proxyStart?: MessageEventTimingsProxyStart
  /** @minimum 0 */
  reponseBodyEnd?: MessageEventTimingsReponseBodyEnd
  /** @minimum 0 */
  reponseBodyStart?: MessageEventTimingsReponseBodyStart
  /** @minimum 0 */
  requestBodyEnd?: MessageEventTimingsRequestBodyEnd
  /** @minimum 0 */
  requestBodyStart?: MessageEventTimingsRequestBodyStart
  /** @minimum 0 */
  requestEnd?: MessageEventTimingsRequestEnd
  /** @minimum 0 */
  requestStart?: MessageEventTimingsRequestStart
}

/**
 * @minimum 0
 */
export type MessageHeaderSize = number

export type RecordRequestsPatchRequests = MessageEventStoreValue[] | null

export interface RecordRequests {
  newRequests: MessageEventStoreValue[]
  patchRequests?: RecordRequestsPatchRequests
}

export type RecordingStatus = (typeof RecordingStatus)[keyof typeof RecordingStatus]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const RecordingStatus = {
  startRecording: 'startRecording',
  pauseRecording: 'pauseRecording',
} as const

export type ResponseCode = (typeof ResponseCode)[keyof typeof ResponseCode]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ResponseCode = {
  ok: 'ok',
  validateError: 'validateError',
} as const

export type ResponseDataWrapperCaptureSwitchData = {
  recordingStatus: RecordingStatus
}

export type ResponseDataWrapperCaptureSwitchMessage = string | null

export interface ResponseDataWrapperCaptureSwitch {
  code: ResponseCode
  data: ResponseDataWrapperCaptureSwitchData
  message?: ResponseDataWrapperCaptureSwitchMessage
}

export type ResponseDataWrapperRecordRequestsDataPatchRequests = MessageEventStoreValue[] | null

export type ResponseDataWrapperRecordRequestsData = {
  newRequests: MessageEventStoreValue[]
  patchRequests?: ResponseDataWrapperRecordRequestsDataPatchRequests
}

export type ResponseDataWrapperRecordRequestsMessage = string | null

export interface ResponseDataWrapperRecordRequests {
  code: ResponseCode
  data: ResponseDataWrapperRecordRequestsData
  message?: ResponseDataWrapperRecordRequestsMessage
}

export type ResponseDataWrapperTupleUnitMessage = string | null

export interface ResponseDataWrapperTupleUnit {
  code: ResponseCode
  data: unknown
  message?: ResponseDataWrapperTupleUnitMessage
}

export interface User {
  id: number
}
