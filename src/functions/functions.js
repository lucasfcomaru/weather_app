import snow from "/snow.svg";
import brightnessHigh from "/brightnessHigh.svg";
import cloud from "/cloud.svg";
import cloudDrizzle from "/cloudDrizzle.svg";

//filtrar ícones
export default function iconSelect(forecastDescription) {
  const imgs = {
    céu: brightnessHigh,
    nublado: cloud,
    nuvens: cloud,
    chuva: cloudDrizzle,
    neve: snow,
  };

  // Converte para minúsculas uma vez, para melhor performance
  const descriptionLower =
    forecastDescription.weather[0].description.toLowerCase();

  for (const icon in imgs) {
    // descrição contém ícone?
    if (descriptionLower.includes(icon)) {
      return imgs[icon]; // Retorna o componente e adiciona a key
    }
  }
  return imgs.nuvens; // ícone padrão
}
