/**
 * Generated by orval v7.9.0 🍺
 * Do not edit manually.
 * utoipa-axum
 * Utoipa's axum bindings for seamless integration for the two
 * OpenAPI spec version: 0.2.0
 */
import { faker } from '@faker-js/faker'
import { delay, http, HttpResponse } from 'msw'

import { RecordingStatus, ResponseCode } from '../utoipaAxum.schemas'
import type {
  MessageEventRequest,
  MessageEventResponse,
  ResponseDataWrapperCaptureSwitch,
  ResponseDataWrapperRecordRequests,
  ResponseDataWrapperTupleUnit,
} from '../utoipaAxum.schemas'

export const getGetCaptureStatusResponseMock = (
  overrideResponse: Partial<ResponseDataWrapperCaptureSwitch> = {}
): ResponseDataWrapperCaptureSwitch => ({
  code: faker.helpers.arrayElement(Object.values(ResponseCode)),
  data: { recordingStatus: faker.helpers.arrayElement(Object.values(RecordingStatus)) },
  message: faker.helpers.arrayElement([
    faker.helpers.arrayElement([faker.string.alpha(20), null]),
    undefined,
  ]),
  ...overrideResponse,
})

export const getToggleCaptureResponseMock = (
  overrideResponse: Partial<ResponseDataWrapperTupleUnit> = {}
): ResponseDataWrapperTupleUnit => ({
  code: faker.helpers.arrayElement(Object.values(ResponseCode)),
  data: {},
  message: faker.helpers.arrayElement([
    faker.helpers.arrayElement([faker.string.alpha(20), null]),
    undefined,
  ]),
  ...overrideResponse,
})

export const getGetCachedRequestsResponseMessageEventRequestMock = (
  overrideResponse: Partial<MessageEventRequest> = {}
): MessageEventRequest => ({
  ...{
    body: faker.string.alpha(20),
    headerSize: faker.number.int({ min: 0, max: undefined }),
    headers: {
      [faker.string.alphanumeric(5)]: faker.string.alpha(20),
    },
    method: faker.string.alpha(20),
    url: faker.string.alpha(20),
    version: faker.string.alpha(20),
  },
  ...overrideResponse,
})

export const getGetCachedRequestsResponseMessageEventResponseMock = (
  overrideResponse: Partial<MessageEventResponse> = {}
): MessageEventResponse => ({
  ...{
    body: faker.string.alpha(20),
    headerSize: faker.number.int({ min: 0, max: undefined }),
    headers: {
      [faker.string.alphanumeric(5)]: faker.string.alpha(20),
    },
    status: faker.number.int({ min: 0, max: undefined }),
    version: faker.string.alpha(20),
  },
  ...overrideResponse,
})

export const getGetCachedRequestsResponseMock = (
  overrideResponse: Partial<ResponseDataWrapperRecordRequests> = {}
): ResponseDataWrapperRecordRequests => ({
  code: faker.helpers.arrayElement(Object.values(ResponseCode)),
  data: {
    newRequests: Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, () => ({
      isNew: faker.datatype.boolean(),
      request: faker.helpers.arrayElement([
        null,
        {
          body: faker.lorem.text(),
          headerSize: faker.number.int({ min: 0 }),
          headers: Object.fromEntries(
            Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => [
              faker.internet.domainWord(),
              faker.lorem.sentence(),
            ])
          ),
          method: faker.helpers.arrayElement(['GET', 'POST', 'PUT', 'DELETE']),
          url: faker.internet.url(),
          version: faker.system.semver(),
        },
      ]),
      response: faker.helpers.arrayElement([
        null,
        {
          body: faker.lorem.text(),
          headerSize: faker.number.int({ min: 0 }),
          headers: Object.fromEntries(
            Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => [
              faker.internet.domainWord(),
              faker.lorem.sentence(),
            ])
          ),
          status: faker.number.int({ min: 100, max: 599 }),
          version: faker.system.semver(),
        },
      ]),
      status: faker.helpers.arrayElement([
        'Initial',
        'RequestStarted',
        'Completed',
        { Error: faker.lorem.sentence() },
        'Cancelled',
      ]),
      timings: {
        proxyEnd: faker.helpers.maybe(() => faker.number.int({ min: 0 })),
        proxyStart: faker.helpers.maybe(() => faker.number.int({ min: 0 })),
        reponseBodyEnd: faker.helpers.maybe(() => faker.number.int({ min: 0 })),
        reponseBodyStart: faker.helpers.maybe(() => faker.number.int({ min: 0 })),
        requestBodyEnd: faker.helpers.maybe(() => faker.number.int({ min: 0 })),
        requestBodyStart: faker.helpers.maybe(() => faker.number.int({ min: 0 })),
        requestEnd: faker.helpers.maybe(() => faker.number.int({ min: 0 })),
        requestStart: faker.helpers.maybe(() => faker.number.int({ min: 0 })),
      },
      traceId: faker.string.uuid(),
    })),
    patchRequests: faker.helpers.maybe(() =>
      Array.from({ length: faker.number.int({ min: 0, max: 5 }) }, () => ({
        isNew: faker.datatype.boolean(),
        request: faker.helpers.maybe(() => ({
          body: faker.lorem.text(),
          headerSize: faker.number.int({ min: 0 }),
          headers: Object.fromEntries(
            Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => [
              faker.internet.domainWord(),
              faker.lorem.sentence(),
            ])
          ),
          method: faker.helpers.arrayElement(['GET', 'POST', 'PUT', 'DELETE']),
          url: faker.internet.url(),
          version: faker.system.semver(),
        })),
        response: faker.helpers.maybe(() => ({
          body: faker.lorem.text(),
          headerSize: faker.number.int({ min: 0 }),
          headers: Object.fromEntries(
            Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => [
              faker.internet.domainWord(),
              faker.lorem.sentence(),
            ])
          ),
          status: faker.number.int({ min: 100, max: 599 }),
          version: faker.system.semver(),
        })),
        status: faker.helpers.arrayElement([
          'Initial',
          'RequestStarted',
          'Completed',
          { Error: faker.lorem.sentence() },
          'Cancelled',
        ]),
        timings: {
          proxyEnd: faker.helpers.maybe(() => faker.number.int({ min: 0 })),
          proxyStart: faker.helpers.maybe(() => faker.number.int({ min: 0 })),
          reponseBodyEnd: faker.helpers.maybe(() => faker.number.int({ min: 0 })),
          reponseBodyStart: faker.helpers.maybe(() => faker.number.int({ min: 0 })),
          requestBodyEnd: faker.helpers.maybe(() => faker.number.int({ min: 0 })),
          requestBodyStart: faker.helpers.maybe(() => faker.number.int({ min: 0 })),
          requestEnd: faker.helpers.maybe(() => faker.number.int({ min: 0 })),
          requestStart: faker.helpers.maybe(() => faker.number.int({ min: 0 })),
        },
        traceId: faker.string.uuid(),
      }))
    ),
  },
  message: faker.helpers.maybe(() => faker.lorem.sentence()),
  ...overrideResponse,
})

export const getGetCaptureStatusMockHandler = (
  overrideResponse?:
    | ResponseDataWrapperCaptureSwitch
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0]
      ) => Promise<ResponseDataWrapperCaptureSwitch> | ResponseDataWrapperCaptureSwitch)
) => {
  return http.get('*/net_request/capture/status', async (info) => {
    await delay(1000)

    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getGetCaptureStatusResponseMock()
      ),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  })
}

export const getToggleCaptureMockHandler = (
  overrideResponse?:
    | ResponseDataWrapperTupleUnit
    | ((
        info: Parameters<Parameters<typeof http.post>[1]>[0]
      ) => Promise<ResponseDataWrapperTupleUnit> | ResponseDataWrapperTupleUnit)
) => {
  return http.post('*/net_request/capture/toggle', async (info) => {
    await delay(1000)

    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getToggleCaptureResponseMock()
      ),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  })
}

export const getGetCachedRequestsMockHandler = (
  overrideResponse?:
    | ResponseDataWrapperRecordRequests
    | ((
        info: Parameters<Parameters<typeof http.post>[1]>[0]
      ) => Promise<ResponseDataWrapperRecordRequests> | ResponseDataWrapperRecordRequests)
) => {
  return http.post('*/net_request/requests', async (info) => {
    await delay(1000)

    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getGetCachedRequestsResponseMock()
      ),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  })
}
export const getNetRequestMock = () => [
  getGetCaptureStatusMockHandler(),
  getToggleCaptureMockHandler(),
  getGetCachedRequestsMockHandler(),
]
