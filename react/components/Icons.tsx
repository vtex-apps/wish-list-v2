import React from 'react'

export const NoteIcon = () => {
  return (
    <svg
      width="20px"
      height="20px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="https://www.w3.org/2000/svg"
    >
      <path
        d="M20 8.25V18C20 21 18.21 22 16 22H8C5.79 22 4 21 4 18V8.25C4 5 5.79 4.25 8 4.25C8 4.87 8.24997 5.43 8.65997 5.84C9.06997 6.25 9.63 6.5 10.25 6.5H13.75C14.99 6.5 16 5.49 16 4.25C18.21 4.25 20 5 20 8.25Z"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 4.25C16 5.49 14.99 6.5 13.75 6.5H10.25C9.63 6.5 9.06997 6.25 8.65997 5.84C8.24997 5.43 8 4.87 8 4.25C8 3.01 9.01 2 10.25 2H13.75C14.37 2 14.93 2.25 15.34 2.66C15.75 3.07 16 3.63 16 4.25Z"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 13H12"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 17H16"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const SearchIcon = () => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="https://www.w3.org/2000/svg"
      xmlnsXlink="https://www.w3.org/1999/xlink"
    >
      <rect width="25" height="24" fill="url(#pattern0_904_1396)" />
      <defs>
        <pattern
          id="pattern0_904_1396"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_904_1396"
            transform="matrix(0.0344828 0 0 0.0359195 0 -0.164511)"
          />
        </pattern>
        <image
          id="image0_904_1396"
          width="29"
          height="37"
          xlinkHref="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAlAB0DASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9Sv7Pi/vT/wDf+T/4qj+z4v70/wD3/k/+KrD+I3xF0D4T+CtU8V+J79dN0TTY/MnnYFjyQqqqjlmZiFAHUkV4H/w118QF0f8A4So/s8+LB4C2+f8A2n/aFt/aHkdfN/s//WY2/N97Hv3rpp4erWXNBaeqXy13ZlKpCDsz6Y/s+L+9P/3/AJP/AIqj7BF/fm/7/v8A41i/Dz4g6D8VPBeleKvDN+upaJqUXm29woIPUhlYHlWVgVKnkEEV0dYSi4txlo0aJpq6Pmn9vixmX4T+FtfkspdS0Hwx4v0vXNds4kMhm0+J2EwKfxKC6kjoApJ4Fe0P8XPBUfgL/hNm8U6WPCfk+eNX+1L5BXbnAbP3sfw/ezxjPFdXNDHcwyQzRrLFIpR43UFWUjBBB6givDG/YZ+A7+IjrZ+Gmkm9LlzHul+zZJz/AMe+/wArHtsxXZCpSnTjTq3XK3tZ7+rX36+hhKM4ycoW17nIf8E79Tsdd+Efi/V9JlhXQ9U8aatfaZYRupaxtXdPLhdAf3Z4LbT2cHoRX1LXz1+zx+xroP7NvxI8ZeI/DWv6k2i69Gsdv4dk/wCPezAbcSW3EykHIRiAVVmBLE5r6FpY2dOpXlOk7p/1b5DoRlGmozVmgoooriNwooooA//Z"
        />
      </defs>
    </svg>
  )
}
