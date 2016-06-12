/**
 * src/server/utils.js: shared utility functions for the server
 *
 * Copyright 2016 Sudaraka Wijesinghe <sudaraka@sudaraka.org>
 *
 * This program comes with ABSOLUTELY NO WARRANTY
 * This is free software, and you are welcome to redistribute it and/or modify
 * it under the terms of the BSD 2-clause License. See the LICENSE file for more
 * details.
 */

export const
  apiResponse = ({ data = null, message = null, code = 200 } = {}) => {
    const
      messageMap = {
        200: 'OK',
        404: 'Not found',
        500: 'Internal error'
      }

    if(!message) {
      // Set fallback message
      message = messageMap[code]
    }

    return {
      'error': 200 != code,
      code,
      message,
      data
    }
  }
