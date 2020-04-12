import Drash from 'drash';

function isValidUrl(string: string): boolean {
  try {
    new URL(string);
  } catch (_) {
    return false;  
  }

  return true;
}

function isEmail(email: string): boolean {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default function validator(params: { [key: string]: string }, request: any): { [key: string]: any } {
  for (const [key, validationRequirements] of Object.entries(params)) {
    const requirements = validationRequirements.split("|")

    for (const requirement of requirements) {
      const value = request.getBodyParam(key);

      if (requirement === "required") {
        if (value === "" || value === null || value === undefined) {
          throw new Drash.Exceptions.HttpException(
            400,
            `This resource requires the '${key}' body param.`
          );
        }
      }

      if (requirement === "string") {
        if (typeof value !== "string") {
          throw new Drash.Exceptions.HttpException(
            400,
            `This resource requires the '${key}' body param to be a string.`
          );
        }
      }

      if (requirement === "number") {
        if (typeof value !== "number") {
          throw new Drash.Exceptions.HttpException(
            400,
            `This resource requires the '${key}' body param to be a string.`
          );
        }
      }

      if (requirement === "url") {
        if (isValidUrl(value)) {
          throw new Drash.Exceptions.HttpException(
            400,
            `This resource requires the '${key}' body param to be an url.`
          );
        }
      }

      if (requirement === "email") {
        if (isEmail(value)) {
          throw new Drash.Exceptions.HttpException(
            400,
            `This resource requires the '${key}' body param to be an email.`
          );
        }
      }
    }

    params[key] = request.getBodyParam(key)
  }

  return params
}