import type { Banner } from "~/models/banners/Banner";
import type {
  CreateBannerCommand,
  EditBannerCommand,
} from "~/models/banners/CreateBannerCommand";
import { CustomFetch } from "~/utils/CustomFetch";

export const GetBanners = () => {
  return CustomFetch<Banner[]>("/Banner");
};
export const GetBannerById = (id: number) => {
  return CustomFetch<Banner>("/Banner/" + id);
};
export const CreateBanner = (command: CreateBannerCommand) => {
  var data = new FormData();

  data.append("Link", command.link);
  data.append("ImageFile", command.imageFile);
  data.append("Position", command.position.toString());

  return CustomFetch("/Banner", {
    method: "POST",
    body: data,
  });
};
export const EditBanner = (command: EditBannerCommand) => {
  var data = new FormData();

  data.append("Id", command.id.toString());
  data.append("Link", command.link);
  if (command.imageFile) {
    data.append("ImageFile", command.imageFile);
  }
  data.append("Position", command.position.toString());

  return CustomFetch("/Banner", {
    method: "PUT",
    body: data,
  });
};
export const DeleteBanner = (id: number) => {
  return CustomFetch("/Banner/" + id, {
    method: "DELETE",
  });
};
