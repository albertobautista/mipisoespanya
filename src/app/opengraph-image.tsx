import { ImageResponse } from "next/og";

// Configuración de la imagen
export const runtime = "edge";
export const alt = "Mi Piso España - Agencia de Reubicación";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f7f5ef", // light-gray color de tu marca
          backgroundImage:
            "linear-gradient(135deg, #aab257 0%, #8b924a 50%, #637569 100%)", // gradiente con tus colores
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(247, 245, 239, 0.95)",
            borderRadius: "24px",
            padding: "60px 80px",
            margin: "40px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            {/* Logo placeholder - en producción podrías cargar la imagen */}
            <div
              style={{
                width: "120px",
                height: "120px",
                backgroundColor: "#637569",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "30px",
                fontSize: "48px",
                color: "white",
                fontWeight: "bold",
              }}
            >
              MP
            </div>

            <h1
              style={{
                fontSize: "48px",
                fontWeight: "bold",
                color: "#637569",
                margin: "0 0 16px 0",
                fontFamily: "system-ui",
              }}
            >
              Mi Piso España
            </h1>

            <p
              style={{
                fontSize: "24px",
                color: "#8b924a",
                margin: "0",
                fontFamily: "system-ui",
                maxWidth: "600px",
              }}
            >
              Tu agencia de reubicación de confianza en Madrid y Barcelona
            </p>

            <div
              style={{
                display: "flex",
                marginTop: "24px",
                gap: "20px",
              }}
            >
              <div
                style={{
                  backgroundColor: "#aab257",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                Madrid
              </div>
              <div
                style={{
                  backgroundColor: "#8b924a",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                Barcelona
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
